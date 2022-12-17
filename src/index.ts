import {execSync} from 'child_process';

const WMIC = 'wmic';
type WMIC_OBJECT =
  | 'ALIAS'
  | 'BASEBOARD'
  | 'BIOS'
  | 'BOOTCONFIG'
  | 'CDROM'
  | 'COMPUTERSYSTEM'
  | 'CPU'
  | 'CSPRODUCT'
  | 'DATAFILE'
  | 'DCOMAPP'
  | 'DESKTOP'
  | 'DESKTOPMONITOR'
  | 'DEVICEMEMORYADDRESS'
  | 'DISKDRIVE'
  | 'DISKQUOTA'
  | 'DMACHANNEL'
  | 'ENVIRONMENT'
  | 'FSDIR'
  | 'GROUP'
  | 'IDECONTROLLER'
  | 'IRQ'
  | 'JOB'
  | 'LOADORDER'
  | 'LOGICALDISK'
  | 'LOGON'
  | 'MEMCACHE'
  | 'MEMORYCHIP'
  | 'MEMPHYSICAL'
  | 'NETCLIENT'
  | 'NETLOGIN'
  | 'NETPROTOCOL'
  | 'NETUSE'
  | 'NICCONFIG'
  | 'NTDOMAIN'
  | 'NTEVENT'
  | 'NTEVENTLOG'
  | 'ONBOARDDEVICE'
  | 'OS'
  | 'PAGEFILE'
  | 'PAGEFILESET'
  | 'PARTITION'
  | 'PORT'
  | 'PORTCONNECTOR'
  | 'PRINTER'
  | 'PRINTERCONFIG'
  | 'PRINTJOB'
  | 'PROCESS'
  | 'PRODUCT'
  | 'QFE'
  | 'QUOTASETTING'
  | 'RDACCOUNT'
  | 'RDNIC'
  | 'RDPERMISSIONS'
  | 'RDTOGGLE'
  | 'RECOVEROS'
  | 'REGISTRY'
  | 'SCSICONTROLLER'
  | 'SERVER'
  | 'SERVICE'
  | 'SHADOWCOPY'
  | 'SHADOWSTORAGE'
  | 'SHARE'
  | 'SOFTWAREELEMENT'
  | 'SOFTWAREFEATURE'
  | 'SOUNDDEV'
  | 'STARTUP'
  | 'SYSACCOUNT'
  | 'SYSDRIVER'
  | 'SYSTEMENCLOSURE'
  | 'SYSTEMSLOT'
  | 'TAPEDRIVE'
  | 'TEMPERATURE'
  | 'UPS'
  | 'USERACCOUNT'
  | 'VOLTAGE'
  | 'VOLUME'
  | 'VOLUMEQUOTASETTING'
  | 'VOLUMEUSERQUOTA'
  | 'WMISET';

type WMIC_VALUE = {
  [key: string]: string;
};

const processValue = (text: string): WMIC_VALUE[] => {
  const titleTexts = text.split('\r\r\n')[0];
  const valuesTexts = text.split('\r\r\n').filter(e => e !== '');
  valuesTexts.shift();
  const valuesList: WMIC_VALUE[] = [];
  const titleList = titleTexts
    .split(' ')
    .reduce((p: Array<string>, e: string) => {
      if (e !== '') p.push(e.trim());
      return p;
    }, []);
  for (let valuesText of valuesTexts) {
    let cloneTitleTexts = titleTexts;
    const result: WMIC_VALUE = {};
    for (let i = 0; i < titleList.length; i++) {
      const indexOfNextValue = cloneTitleTexts.indexOf(titleList[i + 1]);
      if (indexOfNextValue !== -1) {
        const value = valuesText.substring(0, indexOfNextValue - 1);
        valuesText = valuesText.substring(indexOfNextValue);
        cloneTitleTexts = cloneTitleTexts.substring(indexOfNextValue);
        result[titleList[i]] = value.trim();
      } else {
        const value = valuesText.substring(
          cloneTitleTexts.indexOf(titleList[i])
        );
        result[titleList[i]] = value.trim();
      }
    }
    valuesList.push(result);
  }
  return valuesList;
};

export const list = (type: WMIC_OBJECT) => {
  try {
    const text = execSync(`${WMIC} ${type} GET`).toString('utf-8');
    return processValue(text);
  } catch (err) {
    let message = 'Unknown Error';
    if (err instanceof Error) message = err.message;
    throw new Error(message);
  }
};

export const get = (type: WMIC_OBJECT, attributes: string | string[]) => {
  try {
    let list: string[] = [];
    if (typeof attributes === 'object') {
      list = attributes as string[];
    } else list = [attributes];
    const text = execSync(`${WMIC} ${type} GET ${list.toString()}`).toString(
      'utf-8'
    );
    return processValue(text);
  } catch (err) {
    let message = 'Unknown Error';
    if (err instanceof Error) message = err.message;
    throw new Error(message);
  }
};

export const getValue = (type: WMIC_OBJECT, attribute: string) => {
  try {
    const text = execSync(`${WMIC} ${type} GET ${attribute}`).toString('utf-8');
    const result = processValue(text);
    if (result.length > 0) {
      return result[0][attribute];
    }
    return null;
  } catch (err) {
    let message = 'Unknown Error';
    if (err instanceof Error) message = err.message;
    throw new Error(message);
  }
};
