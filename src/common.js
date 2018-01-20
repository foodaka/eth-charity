const DOCTORS_ACCOUNT = '0xA08EFd75D15eE3Ce822015a3206f25471788061B';
const WWF_ACCOUNT = '0x010CfF2CE8B1693358e195a476B80E9C0Aa3CCBB';
const RED_CROSS_ACCOUNT = '0x4829Eb48CB92Ad427CCdf684d148f2348ce670F1';

export const charityOptions = [
  {
    text: 'Doctors Without Borders',
    value: DOCTORS_ACCOUNT,
    image: {avatar: true, src: 'http://www.youthvillage.co.za/wp-content/uploads/2016/03/Doctors-Without-Borders.jpg' }
  },
  {
    text: 'American Red Cross',
    value: RED_CROSS_ACCOUNT,
    image: { avatar: true, src: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7f/American_Red_Cross_logo.svg/1200px-American_Red_Cross_logo.svg.png'}
  },
  {
    text: 'World Wildlife Fund',
    value: WWF_ACCOUNT,
    image: { avatar: true, src: 'http://www.cycling-togethearth.org/wp-content/uploads/2015/05/wwf-270x270.gif'}
  }
]
