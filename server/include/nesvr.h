/* SCHEMA PRODUCED DATE - TIME : 4/21/2017 - 06:59:43 */
#pragma section request_get_volumes
/* Constant REQUEST-GET-VOLUMES created on 04/21/2017 at 06:59 */
#define REQUEST_GET_VOLUMES 1
#pragma section request_get_subvols
/* Constant REQUEST-GET-SUBVOLS created on 04/21/2017 at 06:59 */
#define REQUEST_GET_SUBVOLS 2
#pragma section request_get_files
/* Constant REQUEST-GET-FILES created on 04/21/2017 at 06:59 */
#define REQUEST_GET_FILES 3
#pragma section request_get_file_info
/* Constant REQUEST-GET-FILE-INFO created on 04/21/2017 at 06:59 */
#define REQUEST_GET_FILE_INFO 4
#pragma section request_get_system_info
/* Constant REQUEST-GET-SYSTEM-INFO created on 04/21/2017 at 06:59 */
#define REQUEST_GET_SYSTEM_INFO 5
#pragma section request_get_cpu_list
/* Constant REQUEST-GET-CPU-LIST created on 04/21/2017 at 06:59 */
#define REQUEST_GET_CPU_LIST 6
#pragma section request_get_cpu_info
/* Constant REQUEST-GET-CPU-INFO created on 04/21/2017 at 06:59 */
#define REQUEST_GET_CPU_INFO 16
#pragma section request_get_cpu_busy
/* Constant REQUEST-GET-CPU-BUSY created on 04/21/2017 at 06:59 */
#define REQUEST_GET_CPU_BUSY 17
#pragma section result_success
/* Constant RESULT-SUCCESS created on 04/21/2017 at 06:59 */
#define RESULT_SUCCESS 0
#pragma section result_access_denied
/* Constant RESULT-ACCESS-DENIED created on 04/21/2017 at 06:59 */
#define RESULT_ACCESS_DENIED 2
#pragma section result_invalid_request
/* Constant RESULT-INVALID-REQUEST created on 04/21/2017 at 06:59 */
#define RESULT_INVALID_REQUEST 8995
#pragma section max_items
/* Constant MAX-ITEMS created on 04/21/2017 at 06:59 */
#define MAX_ITEMS 1024
#pragma section max_alt_keys
/* Constant MAX-ALT-KEYS created on 04/21/2017 at 06:59 */
#define MAX_ALT_KEYS 100
#pragma section request_code
/* Definition REQUEST-CODE created on 04/21/2017 at 06:59 */
typedef unsigned short                  request_code_def;
#pragma section result_code
/* Definition RESULT-CODE created on 04/21/2017 at 06:59 */
typedef unsigned short                  result_code_def;
#pragma section item_name
/* Definition ITEM-NAME created on 04/21/2017 at 06:59 */
typedef char                            item_name_def[16];
#pragma section int16
/* Definition INT16 created on 04/21/2017 at 06:59 */
typedef short                           int16_def;
#pragma section int32
/* Definition INT32 created on 04/21/2017 at 06:59 */
#include <tnsint.h>
typedef __int32_t                       int32_def;
#pragma section uint16
/* Definition UINT16 created on 04/21/2017 at 06:59 */
typedef unsigned short                  uint16_def;
#pragma section uint32
/* Definition UINT32 created on 04/21/2017 at 06:59 */
#include <tnsint.h>
typedef __uint32_t                      uint32_def;
#pragma section int64
/* Definition INT64 created on 04/21/2017 at 06:59 */
typedef long long                       int64_def;
#pragma section item_count
/* Definition ITEM-COUNT created on 04/21/2017 at 06:59 */
typedef unsigned short                  item_count_def;
#pragma section get_volumes
/* Definition GET-VOLUMES created on 04/21/2017 at 06:59 */
#pragma fieldalign shared2 __get_volumes
typedef struct __get_volumes
{
   request_code_def                request_code;
   /*value is 1*/
   item_name_def                   node;
} get_volumes_def;
#define get_volumes_def_Size 18
#pragma section get_volumes_result
/* Definition GET-VOLUMES-RESULT created on 04/21/2017 at 06:59 */
#pragma fieldalign shared2 __get_volumes_result
typedef struct __get_volumes_result
{
   result_code_def                 result_code;
   item_name_def                   node;
   item_count_def                  item_count;
   item_name_def                   volumes[1024];
} get_volumes_result_def;
#define get_volumes_result_def_Size 16404
#pragma section get_subvols
/* Definition GET-SUBVOLS created on 04/21/2017 at 06:59 */
#pragma fieldalign shared2 __get_subvols
typedef struct __get_subvols
{
   request_code_def                request_code;
   /*value is 2*/
   item_name_def                   node;
   item_name_def                   volume;
} get_subvols_def;
#define get_subvols_def_Size 34
#pragma section get_subvols_result
/* Definition GET-SUBVOLS-RESULT created on 04/21/2017 at 06:59 */
#pragma fieldalign shared2 __get_subvols_result
typedef struct __get_subvols_result
{
   result_code_def                 result_code;
   item_name_def                   node;
   item_name_def                   volume;
   item_count_def                  item_count;
   item_name_def                   subvols[1024];
} get_subvols_result_def;
#define get_subvols_result_def_Size 16420
#pragma section get_files
/* Definition GET-FILES created on 04/21/2017 at 06:59 */
#pragma fieldalign shared2 __get_files
typedef struct __get_files
{
   request_code_def                request_code;
   /*value is 3*/
   item_name_def                   node;
   item_name_def                   volume;
   item_name_def                   subvol;
} get_files_def;
#define get_files_def_Size 50
#pragma section get_files_result
/* Definition GET-FILES-RESULT created on 04/21/2017 at 06:59 */
#pragma fieldalign shared2 __get_files_result
typedef struct __get_files_result
{
   result_code_def                 result_code;
   item_name_def                   node;
   item_name_def                   volume;
   item_name_def                   subvol;
   short                           item_count;
   item_name_def                   files[1024];
} get_files_result_def;
#define get_files_result_def_Size 16436
#pragma section get_file_info
/* Definition GET-FILE-INFO created on 04/21/2017 at 06:59 */
#pragma fieldalign shared2 __get_file_info
typedef struct __get_file_info
{
   request_code_def                request_code;
   /*value is 4*/
   item_name_def                   node;
   item_name_def                   volume;
   item_name_def                   subvol;
   item_name_def                   filename;
} get_file_info_def;
#define get_file_info_def_Size 66
#pragma section alt_key
/* Definition ALT-KEY created on 04/21/2017 at 06:59 */
#pragma fieldalign shared2 __alt_key
typedef struct __alt_key
{
   char                            key_specifier[2];
   uint16_def                      key_len;
   uint32_def                      key_offset;
   uint16_def                      key_filenum;
   uint16_def                      null_value;
   uint16_def                      attributes;
} alt_key_def;
#define alt_key_def_Size 14
#pragma section file_info
/* Definition FILE-INFO created on 04/21/2017 at 06:59 */
#pragma fieldalign shared2 __file_info
typedef struct __file_info
{
   int64_def                       eof;
   int64_def                       creation_time;
   int64_def                       modification_time;
   int64_def                       open_time;
   uint32_def                      block_length;
   uint32_def                      pri_ext;
   uint32_def                      sec_ext;
   uint32_def                      security_code;
   uint16_def                      file_code;
   uint16_def                      file_format;
   uint16_def                      max_extents;
   uint16_def                      alloc_extents;
   uint16_def                      owner;
   uint16_def                      file_type;
   uint32_def                      rec_length;
   uint32_def                      key_offset;
   uint16_def                      key_len;
   uint16_def                      alt_key_count;
   uint16_def                      alt_file_count;
/* @LightWaveAttribute(dependsOn="alt-key-count") */
   alt_key_def                     alt_keys[100];
/* @LightWaveAttribute(dependsOn="alt-file-count") */
   char                            alt_files[100][64];
} file_info_def;
#define file_info_def_Size 7874
#pragma section get_file_info_result
/* Definition GET-FILE-INFO-RESULT created on 04/21/2017 at 06:59 */
#pragma fieldalign shared2 __get_file_info_result
typedef struct __get_file_info_result
{
   result_code_def                 result_code;
   item_name_def                   node;
   item_name_def                   volume;
   item_name_def                   subvol;
   item_name_def                   filename;
   file_info_def                   file_info;
} get_file_info_result_def;
#define get_file_info_result_def_Size 7940
#pragma section get_system_info
/* Definition GET-SYSTEM-INFO created on 04/21/2017 at 06:59 */
#pragma fieldalign shared2 __get_system_info
typedef struct __get_system_info
{
   request_code_def                request_code;
   /*value is 5*/
} get_system_info_def;
#define get_system_info_def_Size 2
#pragma section system_info
/* Definition SYSTEM-INFO created on 04/21/2017 at 06:59 */
#pragma fieldalign shared2 __system_info
typedef struct __system_info
{
   int32_def                       node_number;
   char                            system_subvol[16];
   char                            rvu[16];
} system_info_def;
#define system_info_def_Size 36
#pragma section get_system_info_result
/* Definition GET-SYSTEM-INFO-RESULT created on 04/21/2017 at 06:59 */
#pragma fieldalign shared2 __get_system_info_result
typedef struct __get_system_info_result
{
   result_code_def                 result_code;
   item_name_def                   node;
   system_info_def                 system_info;
} get_system_info_result_def;
#define get_system_info_result_def_Size 54
#pragma section get_cpu_list
/* Definition GET-CPU-LIST created on 04/21/2017 at 06:59 */
#pragma fieldalign shared2 __get_cpu_list
typedef struct __get_cpu_list
{
   request_code_def                request_code;
   /*value is 6*/
   item_name_def                   node;
} get_cpu_list_def;
#define get_cpu_list_def_Size 18
#pragma section cpu
/* Definition CPU created on 04/21/2017 at 06:59 */
#pragma fieldalign shared2 __cpu
typedef struct __cpu
{
   uint16_def                      cpu_number;
   char                            name[16];
   uint16_def                      busy;
} cpu_def;
#define cpu_def_Size 20
#pragma section cpu_list
/* Definition CPU-LIST created on 04/21/2017 at 06:59 */
#pragma fieldalign shared2 __cpu_list
typedef struct __cpu_list
{
   uint16_def                      cpu_count;
   cpu_def                         cpu[16];
} cpu_list_def;
#define cpu_list_def_Size 322
#pragma section get_cpu_list_result
/* Definition GET-CPU-LIST-RESULT created on 04/21/2017 at 06:59 */
#pragma fieldalign shared2 __get_cpu_list_result
typedef struct __get_cpu_list_result
{
   result_code_def                 result_code;
   item_name_def                   node;
   cpu_list_def                    cpu_list;
} get_cpu_list_result_def;
#define get_cpu_list_result_def_Size 340
#pragma section max_cpus
/* Constant MAX-CPUS created on 04/21/2017 at 06:59 */
#define MAX_CPUS 16
#pragma section get_cpu_info
/* Definition GET-CPU-INFO created on 04/21/2017 at 06:59 */
#pragma fieldalign shared2 __get_cpu_info
typedef struct __get_cpu_info
{
   request_code_def                request_code;
   /*value is 16*/
} get_cpu_info_def;
#define get_cpu_info_def_Size 2
#pragma section cpu_info
/* Definition CPU-INFO created on 04/21/2017 at 06:59 */
#pragma fieldalign shared2 __cpu_info
typedef struct __cpu_info
{
   short                           cpu_count;
   struct
   {
      short                           cpu_id;
      short                           state;
      char                            name[16];
   } info[16];
} cpu_info_def;
#define cpu_info_def_Size 322
#pragma section get_cpu_info_reply
/* Definition GET-CPU-INFO-REPLY created on 04/21/2017 at 06:59 */
#pragma fieldalign shared2 __get_cpu_info_reply
typedef struct __get_cpu_info_reply
{
   short                           reply_code;
   cpu_info_def                    response;
} get_cpu_info_reply_def;
#define get_cpu_info_reply_def_Size 324
#pragma section get_cpu_busy
/* Definition GET-CPU-BUSY created on 04/21/2017 at 06:59 */
#pragma fieldalign shared2 __get_cpu_busy
typedef struct __get_cpu_busy
{
   request_code_def                request_code;
   /*value is 17*/
} get_cpu_busy_def;
#define get_cpu_busy_def_Size 2
#pragma section cpu_busy
/* Definition CPU-BUSY created on 04/21/2017 at 06:59 */
#pragma fieldalign shared2 __cpu_busy
typedef struct __cpu_busy
{
   long long                       timestamp;
   short                           cpu_count;
   short                           busy[16];
} cpu_busy_def;
#define cpu_busy_def_Size 42
#pragma section get_cpu_busy_reply
/* Definition GET-CPU-BUSY-REPLY created on 04/21/2017 at 06:59 */
#pragma fieldalign shared2 __get_cpu_busy_reply
typedef struct __get_cpu_busy_reply
{
   short                           reply_code;
   cpu_busy_def                    response;
} get_cpu_busy_reply_def;
#define get_cpu_busy_reply_def_Size 44
#pragma section error_result
/* Definition ERROR-RESULT created on 04/21/2017 at 06:59 */
#pragma fieldalign shared2 __error_result
typedef struct __error_result
{
   result_code_def                 result_code;
   char                            description[256];
} error_result_def;
#define error_result_def_Size 258
