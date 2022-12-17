# wmic-get
Simple wrapper around [WMIC](https://learn.microsoft.com/en-us/windows/win32/wmisdk/wmic) interface for Node.js to retrieve all or specific property values.

## Installation
```npm
npm i wmic-get
```

## Example
```js
import { getValue } from 'wmic-get';

// equivalent to ' wmic cpu get Name'
const cpuName = getValue('CPU','Name');
console.log(cpuName)
// Sample: Microsoft Windows 11 Pro
```

## Usage
### list(section)
Return an array of values from `wmic` like Memory info.
```js
import { list } from 'wmic-get';

// equivalent to ' wmic MEMPHYSICAL get'
const mem = list('MEMPHYSICAL');
console.log(mem)
// Sample: [
//  {
//    Caption: 'Physical Memory Array',
//    CreationClassName: 'Win32_PhysicalMemoryArray',
//    Depth: '',
//    Description: 'Physical Memory Array',
//    Height: '',
//    HotSwappable: '',
//    InstallDate: '',
//    Location: '3',
//    Manufacturer: '',
//    MaxCapacity: '67108864',
//   ...

```
### get(section, attributeName | [attributesList])
Return an array of values from `wmic` with input attribute/s.
```js
import { get } from 'wmic-get';

// equivalent to ' wmic os get Name,OSType'
const os = get('OS',['Name','OSType']);
console.log(os)
// Sample: [
//  {
//    Name: 'Microsoft Windows 11 Pro|C:\\WINDOWS|\\Device\\Harddisk1\\Partition2',
//    OSType: '18'
//  }
//]
```
### getValue(section, attributeName)
Return value of specific attributes from `wmic`.
```js
import { getValue } from 'wmic-get'
;
// equivalent to ' wmic cpu get Manufacturer'
const cpuMF = getValue('CPU','Manufacturer');
console.log(cpuMF)
// Sample: Microsoft Corporation
```

## Section list

```
ALIAS                    - Access to the aliases available on the local system
BASEBOARD                - Base board (also known as a motherboard or system board) management.
BIOS                     - Basic input/output services (BIOS) management.
BOOTCONFIG               - Boot configuration management.
CDROM                    - CD-ROM management.
COMPUTERSYSTEM           - Computer system management.
CPU                      - CPU management.
CSPRODUCT                - Computer system product information from SMBIOS.
DATAFILE                 - DataFile Management.
DCOMAPP                  - DCOM Application management.
DESKTOP                  - User's Desktop management.
DESKTOPMONITOR           - Desktop Monitor management.
DEVICEMEMORYADDRESS      - Device memory addresses management.
DISKDRIVE                - Physical disk drive management.
DISKQUOTA                - Disk space usage for NTFS volumes.
DMACHANNEL               - Direct memory access (DMA) channel management.
ENVIRONMENT              - System environment settings management.
FSDIR                    - Filesystem directory entry management.
GROUP                    - Group account management.
IDECONTROLLER            - IDE Controller management.
IRQ                      - Interrupt request line (IRQ) management.
JOB                      - Provides  access to the jobs scheduled using the schedule service.
LOADORDER                - Management of system services that define execution dependencies.
LOGICALDISK              - Local storage device management.
LOGON                    - LOGON Sessions.
MEMCACHE                 - Cache memory management.
MEMORYCHIP               - Memory chip information.
MEMPHYSICAL              - Computer system's physical memory management.
NETCLIENT                - Network Client management.
NETLOGIN                 - Network login information (of a particular user) management.
NETPROTOCOL              - Protocols (and their network characteristics) management.
NETUSE                   - Active network connection management.
NIC                      - Network Interface Controller (NIC) management.
NICCONFIG                - Network adapter management.
NTDOMAIN                 - NT Domain management.
NTEVENT                  - Entries in the NT Event Log.
NTEVENTLOG               - NT eventlog file management.
ONBOARDDEVICE            - Management of common adapter devices built into the motherboard (system board).
OS                       - Installed Operating System/s management.
PAGEFILE                 - Virtual memory file swapping management.
PAGEFILESET              - Page file settings management.
PARTITION                - Management of partitioned areas of a physical disk.
PORT                     - I/O port management.
PORTCONNECTOR            - Physical connection ports management.
PRINTER                  - Printer device management.
PRINTERCONFIG            - Printer device configuration management.
PRINTJOB                 - Print job management.
PROCESS                  - Process management.
PRODUCT                  - Installation package task management.
QFE                      - Quick Fix Engineering.
QUOTASETTING             - Setting information for disk quotas on a volume.
RDACCOUNT                - Remote Desktop connection permission management.
RDNIC                    - Remote Desktop connection management on a specific network adapter.
RDPERMISSIONS            - Permissions to a specific Remote Desktop connection.
RDTOGGLE                 - Turning Remote Desktop listener on or off remotely.
RECOVEROS                - Information that will be gathered from memory when the operating system fails.
REGISTRY                 - Computer system registry management.
SCSICONTROLLER           - SCSI Controller management.
SERVER                   - Server information management.
SERVICE                  - Service application management.
SHADOWCOPY               - Shadow copy management.
SHADOWSTORAGE            - Shadow copy storage area management.
SHARE                    - Shared resource management.
SOFTWAREELEMENT          - Management of the  elements of a software product installed on a system.
SOFTWAREFEATURE          - Management of software product subsets of SoftwareElement.
SOUNDDEV                 - Sound Device management.
STARTUP                  - Management of commands that run automatically when users log onto the computer system.
SYSACCOUNT               - System account management.
SYSDRIVER                - Management of the system driver for a base service.
SYSTEMENCLOSURE          - Physical system enclosure management.
SYSTEMSLOT               - Management of physical connection points including ports,  slots and peripherals, and proprietary connections points.
TAPEDRIVE                - Tape drive management.
TEMPERATURE              - Data management of a temperature sensor (electronic thermometer).
TIMEZONE                 - Time zone data management.
UPS                      - Uninterruptible power supply (UPS) management.
USERACCOUNT              - User account management.
VOLTAGE                  - Voltage sensor (electronic voltmeter) data management.
VOLUME                   - Local storage volume management.
VOLUMEQUOTASETTING       - Associates the disk quota setting with a specific disk volume.
VOLUMEUSERQUOTA          - Per user storage volume quota management.
WMISET                   - WMI service operational parameters management.
```

## Contributing

All contributions are accepted as a PR.

* You can file issues by submitting a PR.
* Implement new feature by submitting a PR.
* Improve documentation by submitting PR.
You are welcome to improve this project! It would help me so much!
## Support

For support, email downy1229@gmail.com!