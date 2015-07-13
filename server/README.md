NonStop Explorer Pathway Server
---

The NonStop Explorer Pathway Server may be built on your system using the following procedure:

##### Install the Source Code

* Copy the [PAK file] (nepak.pak) to your NonStop Server. Make sure the file is transferred
as a binary file.
* Unpak the file into a subvol of your choice.

        tacl> unpak nepak ($*.*.*), listall, myid, vol <your-subvol>

##### Build the DDL dictionary and Pathway Server

* Run the NEBLD macro, which builds the dictionary and the NESVR program. The dictionary build
process also creates C, COBOL, and TAL definition files.

        tacl> run nebld

##### Configuring the Pathway

The NESTART TACL macro starts and configures the Pathmon. The macro contains a section that
must be configured for your system. The customizable parameters appear in the following block:

        == Customize these parameters for your system
        #set console $zhome
        #set volumes $dsmscm, $oss
        #set nePathmon $nepm
        == End of customization

Customize these parameters accordingly:

* console - The TERM/IN/OUT used to start the Pathmon and configured serverclasses.
* volumes - As a security measure, this parameter is used by NESVR to restrict the results
of storage requests to a specific list of volumes.
* nePathmon - The name of the Pathmon process.

##### Starting the Pathway

Start the pathway by running the NESTART TACL macro:

        tacl> run nestart

##### Stopping the Pathway

Stop the pathway using the PATHMON CLI:

        tacl> pathcom <nePathmon-name>; shutdown2




