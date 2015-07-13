/**
 *  Copyright (c) 2015 NuWave Technologies, Inc. All rights reserved. (www.nuwavetech.com)
 */

#pragma nolist

#include <cextdecs>
#include <tal.h>
#include <zsysc>
#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <ctype.h>
#include "nesvr.h"

#pragma list

#define OMIT /**/

static int volumeCount;
static char* volume[128];
static char* volumes;
static char node[32];

static void getCpuList(short* request);
static void getFileInfo(short* request);
static void getFiles(short* request);
static void getSubvols(short* request);
static void getSystemInfo(short* request);
static void getVolumes(short* request);
static int isVolumeEnabled(char* volumeName);
static void toUpper(char* string, int len);
static void updateCpuList();

typedef struct Info {
  long long elapsedTime;
  long long busyTime;
  short typeNameLength;
  char typeName[10];
  int online;
  int percentBusy;
} Info;

static Info currentCpuInfo[16];
static Info lastCpuInfo[16];

void T9999A00_19AUG2014_NuWave_NonStop_Explorer_0_0_3(void) {return;}

#if !defined(strcasecmp)
int strcasecmp(const char *s1, const char *s2) {
  int cmp;
  while (*s1 && *s2) {
    if ((cmp = tolower(*s1++) - tolower(*s2++)))
      return cmp;
  }

  return *s1 - *s2;
}
#endif

static void getCpuList(short* request) {
  int i;
  get_cpu_list_result_def getCpuListResult;
  short cpu;

  memset(&getCpuListResult, 0, sizeof(getCpuListResult));
  strcpy(getCpuListResult.node, node);

  /* Build the response. */
  for (i = 0, cpu = 0; cpu < 16; cpu++) {
    if (currentCpuInfo[cpu].online) {
      getCpuListResult.cpu_list.cpu[i].cpu_number = cpu;
      getCpuListResult.cpu_list.cpu[i].busy = currentCpuInfo[cpu].percentBusy;
      memcpy(getCpuListResult.cpu_list.cpu[i].name, currentCpuInfo[cpu].typeName,
              currentCpuInfo[cpu].typeNameLength);
      i++;
      getCpuListResult.cpu_list.cpu_count++;
    }
  }

  REPLYX((char*) &getCpuListResult, sizeof(getCpuListResult));

  return;
}

static void getFileInfo(short* request) {
  short rc;
  short len;
  char name[64];
  short itemList[50];
  short itemCount;
  short resultLen;
  short errorItem;
  int i;
  int offset;
  char altKeyDesc[MAX_ALT_KEYS][14];
  short fileLengths[MAX_ALT_KEYS];
  char fileNames[64 * MAX_ALT_KEYS];
  get_file_info_def* getFileInfo;
  get_file_info_result_def getFileInfoResult;

  getFileInfo = (get_file_info_def*) request;
  toUpper(getFileInfo->volume, sizeof(getFileInfo->volume));
  toUpper(getFileInfo->subvol, sizeof(getFileInfo->subvol));
  toUpper(getFileInfo->filename, sizeof(getFileInfo->filename));

  memset(&getFileInfoResult, 0, sizeof(getFileInfoResult));
  strcpy(getFileInfoResult.node, node);
  strcpy(getFileInfoResult.volume, getFileInfo->volume);
  strcpy(getFileInfoResult.subvol, getFileInfo->subvol);
  strcpy(getFileInfoResult.filename, getFileInfo->filename);

  if (!isVolumeEnabled(getFileInfo->volume)) {
    getFileInfoResult.result_code = RESULT_ACCESS_DENIED;
    REPLYX((char*) &getFileInfoResult, sizeof(getFileInfoResult));
    return;
  }

  sprintf(name, "%s.%s.%s", getFileInfo->volume, getFileInfo->subvol, getFileInfo->filename);
  len = (short) strlen(name);

  /* Read attributes for all files. The output starts with element fileInfo->fileLen. */
  itemCount = 0;

  itemList[itemCount++] = 191; /* bit file length : 8 */
  itemList[itemCount++] = 54; /* creation time : 8 */
  itemList[itemCount++] = 144; /* aggregate modification time : 8 */
  itemList[itemCount++] = 56; /* last open time : 8 */
  itemList[itemCount++] = 197; /* blockLen : 4 */
  itemList[itemCount++] = 199; /* priExtentSize : 4 */
  itemList[itemCount++] = 200; /* secExtentSize : 4 */
  itemList[itemCount++] = 62; /* security : 4 */
  itemList[itemCount++] = 42; /* file code : 2 */
  itemList[itemCount++] = 195; /* file format : 2 */
  itemList[itemCount++] = 52; /* max extents  : 2 */
  itemList[itemCount++] = 53; /* allocated extents : 2 */
  itemList[itemCount++] = 58; /* owner : 2 */
  itemList[itemCount++] = 41; /* file type : 2 */

  rc = FILE_GETINFOLISTBYNAME_(name, (short) strlen(name), itemList, itemCount,
          (short*) &getFileInfoResult.file_info, (short) sizeof(getFileInfoResult.file_info),
          &resultLen, &errorItem);

  if (rc) {
    getFileInfoResult.result_code = rc;
    REPLYX((char*) &getFileInfoResult, sizeof(getFileInfoResult));
    return;
  }

  if (getFileInfoResult.file_info.file_type != 0) {
    itemCount = 0;
    itemList[itemCount++] = 196; /* reclen : 4*/
    itemList[itemCount++] = 198; /* keyOffset : 4*/
    itemList[itemCount++] = 46; /* keyLen : 2 */
    itemList[itemCount++] = 100; /* alt keys : 2 */
    itemList[itemCount++] = 102; /* alt files : 2 */
    len = 14;

    rc = FILE_GETINFOLISTBYNAME_(name, (short) strlen(name), itemList, itemCount,
            (short*) &getFileInfoResult.file_info.rec_length, len);
  }

  if (getFileInfoResult.file_info.alt_key_count) {
    itemCount = 0;
    itemList[itemCount++] = 106; /* alt key descriptors */

    rc = FILE_GETINFOLISTBYNAME_(name, (short) strlen(name), itemList, itemCount,
            (short*) altKeyDesc, (short) sizeof(altKeyDesc), &resultLen, &errorItem);

    for (i = 0, offset = 0; i < getFileInfoResult.file_info.alt_key_count; i++) {
      memcpy(&getFileInfoResult.file_info.alt_keys[i], altKeyDesc[i], 14);
      offset += fileLengths[i];
    }

    itemCount = 0;
    itemList[itemCount++] = 103; /* file lengths */

    rc = FILE_GETINFOLISTBYNAME_(name, (short) strlen(name), itemList, itemCount, fileLengths,
            (short) sizeof(fileLengths), &resultLen, &errorItem);

    itemCount = 0;
    itemList[itemCount++] = 104; /* file names. */

    rc = FILE_GETINFOLISTBYNAME_(name, (short) strlen(name), itemList, itemCount,
            (short*) fileNames, (short) sizeof(fileNames), &resultLen, &errorItem);

    for (i = 0, offset = 0; i < getFileInfoResult.file_info.alt_file_count; i++) {
      memcpy(getFileInfoResult.file_info.alt_files[i], &fileNames[offset], fileLengths[i]);
      offset += fileLengths[i];
    }

  }

  REPLYX((char*) &getFileInfoResult, sizeof(getFileInfoResult));

  return;
}

static void getFiles(short* request) {
  short rc;
  short searchId;
  short len;
  char name[64];
  char* p;
  get_files_def* getFiles;
  get_files_result_def getFilesResult;

  getFiles = (get_files_def*) request;
  toUpper(getFiles->volume, sizeof(getFiles->volume));
  toUpper(getFiles->subvol, sizeof(getFiles->subvol));
  memset(&getFilesResult, 0, sizeof(getFilesResult));
  strcpy(getFilesResult.node, node);
  strcpy(getFilesResult.volume, getFiles->volume);
  strcpy(getFilesResult.subvol, getFiles->subvol);

  if (!isVolumeEnabled(getFiles->volume)) {
    getFilesResult.result_code = RESULT_ACCESS_DENIED;
    REPLYX((char*) &getFilesResult, sizeof(getFilesResult));
    return;
  }

  sprintf(name, "%s.%s.*", getFiles->volume, getFiles->subvol);
  len = (short) strlen(name);
  if ((rc = FILENAME_FINDSTART_(&searchId, name, len, 1)) == 0) {
    while (getFilesResult.item_count < MAX_ITEMS
            && (rc = FILENAME_FINDNEXT_(searchId, name, sizeof(name), &len)) == 0) {

      name[len] = 0;
      if ((p = strchr(name, '.')))
        strcpy(getFilesResult.files[getFilesResult.item_count], ++p);
      else
        strcpy(getFilesResult.files[getFilesResult.item_count], name);
      getFilesResult.item_count++;
    }

    qsort(getFilesResult.files, getFilesResult.item_count, sizeof(getFilesResult.files[0]), strcmp);
  } else {
    getFilesResult.result_code = rc;
  }

  FILENAME_FINDFINISH_(searchId);

  REPLYX((char*) &getFilesResult, sizeof(getFilesResult));

  return;
}

static void getSubvols(short* request) {
  short rc;
  short searchId;
  short len;
  char name[64];
  get_subvols_def* getSubvols;
  get_subvols_result_def getSubvolsResult;

  getSubvols = (get_subvols_def*) request;

  toUpper(getSubvols->volume, sizeof(getSubvols->volume));
  memset(&getSubvolsResult, 0, sizeof(getSubvolsResult));
  strcpy(getSubvolsResult.node, node);
  strcpy(getSubvolsResult.volume, getSubvols->volume);

  if (!isVolumeEnabled(getSubvols->volume)) {
    getSubvolsResult.result_code = RESULT_ACCESS_DENIED;
    REPLYX((char*) &getSubvolsResult, sizeof(getSubvolsResult));
    return;
  }

  sprintf(name, "%s.*", getSubvols->volume);
  len = (short) strlen(name);
  if ((rc = FILENAME_FINDSTART_(&searchId, name, len, 1)) == 0) {
    while (getSubvolsResult.item_count < MAX_ITEMS
            && (rc = FILENAME_FINDNEXT_(searchId, name, sizeof(name), &len)) == 0) {

      if (*name == '#')
        continue;

      name[len] = 0;
      strcpy(getSubvolsResult.subvols[getSubvolsResult.item_count], name);
      getSubvolsResult.item_count++;
    }

    qsort(getSubvolsResult.subvols, getSubvolsResult.item_count,
            sizeof(getSubvolsResult.subvols[0]), strcmp);
  } else {
    getSubvolsResult.result_code = rc;
  }

  FILENAME_FINDFINISH_(searchId);

  REPLYX((char*) &getSubvolsResult, sizeof(getSubvolsResult));

  return;
}

static void getSystemInfo(short* request) {
  short rc;
  short len;
  char tmp[64];
  char piece[64];
  get_system_info_result_def getSysInfoResult;

  memset(&getSysInfoResult, 0, sizeof(getSysInfoResult));
  strcpy(getSysInfoResult.node, node);

  NODENAME_TO_NODENUMBER_(NULL, 0, &getSysInfoResult.system_info.node_number);

  rc = TOSVERSION();
  sprintf(getSysInfoResult.system_info.rvu, "%c%02d", ((rc & 0xff00) >> 8) - 10, (rc & 0xff));

  NODE_GETCOLDLOADINFO_(tmp, sizeof(tmp), &len);
  FILENAME_DECOMPOSE_(tmp, len, piece, sizeof(piece), &len, 1);
  piece[len] = 0;
  strcpy(getSysInfoResult.system_info.system_subvol, piece);

  REPLYX((char*) &getSysInfoResult, sizeof(getSysInfoResult));

  return;
}

static void getVolumes(short* request) {
  short rc;
  short searchId;
  short len;
  char name[64];
  get_volumes_result_def getVolumesResult;

  memset(&getVolumesResult, 0, sizeof(getVolumesResult));

  strcpy(getVolumesResult.node, node);

  strcpy(name, "$*");
  len = (short) strlen(name);
  if ((rc = FILENAME_FINDSTART_(&searchId, name, len, 0, 3)) == 0) {
    while (getVolumesResult.item_count < MAX_ITEMS
            && (rc = FILENAME_FINDNEXT_(searchId, name, sizeof(name), &len)) == 0) {
      name[len] = 0;

      if (!isVolumeEnabled(name))
        continue;

      strcpy(getVolumesResult.volumes[getVolumesResult.item_count++], name);
    }

    qsort(getVolumesResult.volumes, getVolumesResult.item_count,
            sizeof(getVolumesResult.volumes[0]), strcmp);
  } else {
    getVolumesResult.result_code = rc;
  }

  FILENAME_FINDFINISH_(searchId);

  REPLYX((char*) &getVolumesResult, sizeof(getVolumesResult));

  return;
}

static int isVolumeEnabled(char* volumeName) {
  int i;

  if (volumeCount == 0)
    return 1;

  for (i = 0; i < volumeCount; i++) {
    if (strcasecmp(volume[i], volumeName) == 0)
      return 1;
  }

  return 0;
}

static void toUpper(char* string, int len) {
  int i;
  for (i = 0; *string && i < len; i++)
    string[i] = (char) toupper(string[i]);
}

static void updateCpuList() {
  short rc;
  short len;
  short cpu;
  long long busyTime;
  long long elapsedTime;

#define ITEM_ELAPSEDTIME       18
#define ITEM_BUSYTIME          19
#define ITEM_TYPENAME          48

  short items[] =
    { ITEM_ELAPSEDTIME, ITEM_BUSYTIME, ITEM_TYPENAME };

  /* Get current processor info. */
  for (cpu = 0; cpu < 16; cpu++) {
    rc = PROCESSOR_GETINFOLIST_(node, (short) strlen(node), cpu, items,
            (sizeof(items) / sizeof(items[0])), (short *) &currentCpuInfo[cpu], sizeof(Info), &len);
    currentCpuInfo[cpu].online = (rc == 0 ? 1 : 0);
  }

  /* Calculate busy time for each cpu. */
  for (cpu = 0; cpu < 16; cpu++) {
    if (currentCpuInfo[cpu].online) {
      busyTime = currentCpuInfo[cpu].busyTime - lastCpuInfo[cpu].busyTime;
      elapsedTime = currentCpuInfo[cpu].elapsedTime - lastCpuInfo[cpu].elapsedTime;
      currentCpuInfo[cpu].percentBusy = (unsigned short) (busyTime / (elapsedTime / 100));
    }
  }

  memcpy(lastCpuInfo, currentCpuInfo, sizeof(lastCpuInfo));

  return;
}

int main(void) {

  int openCount;
  short request[256];
  int cc;
  short rc;
  short len;
  short filenum;
  short countRead;
  char* p;
  int done;
  error_result_def errorResult;

  /* Load the enabled volume list. Only volumes in this list will be accessible. */
  volumeCount = 0;
  if ((p = getenv("VOLUMES"))) {
    volumes = malloc(strlen(p) + 1);
    strcpy(volumes, p);
    toUpper(volumes, (int) strlen(p));
    p = strtok(volumes, ", ");
    while (p) {
      volume[volumeCount++] = p;
      p = strtok(NULL, ", ");
    }
  }

  /* Open $RECEIVE */
  if ((rc = FILE_OPEN_("$RECEIVE", 8, &filenum, OMIT, OMIT, 0, 1)) != 0) {
    printf("Unable to open $RECEIVE, file system error %d\n", (int) rc);
    return -1;
  }

  /* No support for cross node lookups so get the current node name for future use. */
  NODENUMBER_TO_NODENAME_(-1, node, sizeof(node), &len);
  node[len] = 0;

  /* Initialize the cpu list and start the update timer. The cpu list will be updated
   * every 5 seconds. */
  memset(&lastCpuInfo, 0, sizeof(lastCpuInfo));
  updateCpuList();
  SIGNALTIMEOUT(500);

  /* Process messages. */
  for (done = 0, openCount = 0; !done;) {

    cc = (short) READUPDATEX(filenum, (char*) request, sizeof(request), &countRead);

    if (!_status_eq(cc)) {
      FILE_GETINFO_(filenum, &rc);
      if (rc != 6) {
        printf("READX error %d\n", (int) rc);
        return -1;
      }
    }

    /* Can't process the request if there's not request code. */
    if (countRead < 2) {
      memset(&errorResult, 0, sizeof(errorResult));
      errorResult.result_code = RESULT_INVALID_REQUEST;
      sprintf(errorResult.description, "Invalid request length");
      cc = REPLYX((char*) &errorResult, sizeof(errorResult));
      continue;
    }

    switch (*request) {
    case ZSYS_VAL_SMSG_OPEN:
      openCount++;
      REPLYX(NULL, 0);
      break;
    case ZSYS_VAL_SMSG_CLOSE:
      if (--openCount <= 0)
        done = 1;
      REPLYX(NULL, 0);
      break;
    case ZSYS_VAL_SMSG_TIMESIGNAL:
      updateCpuList();
      SIGNALTIMEOUT(500);
      REPLYX(NULL, 0);
      break;
    case REQUEST_GET_VOLUMES:
      getVolumes(request);
      break;
    case REQUEST_GET_SUBVOLS:
      getSubvols(request);
      break;
    case REQUEST_GET_FILES:
      getFiles(request);
      break;
    case REQUEST_GET_FILE_INFO:
      getFileInfo(request);
      break;
    case REQUEST_GET_SYSTEM_INFO:
      getSystemInfo(request);
      break;
    case REQUEST_GET_CPU_LIST:
      getCpuList(request);
      break;
    default:
      memset(&errorResult, 0, sizeof(errorResult));
      errorResult.result_code = RESULT_INVALID_REQUEST;
      sprintf(errorResult.description, "Unknown request code %d", (int) *request);
      cc = REPLYX((char*) &errorResult, sizeof(errorResult));
      break;
    }
  }

  return 0;
}

/** End of file */
