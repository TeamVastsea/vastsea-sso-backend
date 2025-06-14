declare type TokenPair = {
  access_token: string;
  id_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
};

declare type Fail = {
  error: string;
  error_description: string;
};

declare type TokenPayload =
  | {
      active: false;
    }
  | {
      active: true;
      client_id: string;
      name: string;
      id: string;
      email: string;
    };

declare type GetProfile =
  | {
      status: 'error';
      msg: string;
      data: null;
      data2: null;
    }
  | {
      status: 'ok';
      msg: '';
      sub: '';
      name: '';
      data: User;
      data2: null;
    };

declare interface User {
  accessKey?: string;
  accessSecret?: string;
  address?: string[];
  adfs?: string;
  affiliation?: string;
  alipay?: string;
  amazon?: string;
  apple?: string;
  auth0?: string;
  avatar?: string;
  avatarType?: string;
  azuread?: string;
  azureadb2c?: string;
  baidu?: string;
  battlenet?: string;
  bilibili?: string;
  bio?: string;
  birthday?: string;
  bitbucket?: string;
  box?: string;
  casdoor?: string;
  cloudfoundry?: string;
  countryCode?: string;
  createdIp?: string;
  createdTime?: string;
  custom?: string;
  dailymotion?: string;
  deezer?: string;
  deletedTime?: string;
  digitalocean?: string;
  dingtalk?: string;
  discord?: string;
  displayName?: string;
  douyin?: string;
  dropbox?: string;
  education?: string;
  email?: string;
  emailVerified?: boolean;
  eveonline?: string;
  externalId?: string;
  facebook?: string;
  firstName?: string;
  fitbit?: string;
  gender?: string;
  gitea?: string;
  gitee?: string;
  github?: string;
  gitlab?: string;
  google?: string;
  groups?: string[];
  hash?: string;
  heroku?: string;
  homepage?: string;
  id?: string;
  idCard?: string;
  idCardType?: string;
  influxcloud?: string;
  infoflow?: string;
  instagram?: string;
  intercom?: string;
  isAdmin?: boolean;
  isDefaultAvatar?: boolean;
  isDeleted?: boolean;
  isForbidden?: boolean;
  isOnline?: boolean;
  kakao?: string;
  karma?: number;
  kwai?: string;
  language?: string;
  lark?: string;
  lastfm?: string;
  lastName?: string;
  lastSigninIp?: string;
  lastSigninTime?: string;
  lastSigninWrongTime?: string;
  ldap?: string;
  line?: string;
  linkedin?: string;
  location?: string;
  mailru?: string;
  managedAccounts?: ObjectManagedAccount[];
  meetup?: string;
  metamask?: string;
  mfaEmailEnabled?: boolean;
  mfaPhoneEnabled?: boolean;
  microsoftonline?: string;
  multiFactorAuths?: ObjectMfaProps[];
  name?: string;
  naver?: string;
  nextcloud?: string;
  okta?: string;
  onedrive?: string;
  oura?: string;
  owner?: string;
  password?: string;
  passwordSalt?: string;
  passwordType?: string;
  patreon?: string;
  paypal?: string;
  permanentAvatar?: string;
  permissions?: ObjectPermission[];
  phone?: string;
  preferredMfaType?: string;
  preHash?: string;
  properties?:
    | any[]
    | boolean
    | number
    | { [key: string]: string }
    | null
    | string;
  qq?: string;
  ranking?: number;
  recoveryCodes?: string[];
  region?: string;
  roles?: ObjectRole[];
  salesforce?: string;
  score?: number;
  shopify?: string;
  signinWrongTimes?: number;
  signupApplication?: string;
  slack?: string;
  soundcloud?: string;
  spotify?: string;
  steam?: string;
  strava?: string;
  stripe?: string;
  tag?: string;
  tiktok?: string;
  title?: string;
  totpSecret?: string;
  tumblr?: string;
  twitch?: string;
  twitter?: string;
  type?: string;
  typetalk?: string;
  uber?: string;
  updatedTime?: string;
  vk?: string;
  web3onboard?: string;
  webauthnCredentials?: { [key: string]: any }[];
  wechat?: string;
  wecom?: string;
  weibo?: string;
  wepay?: string;
  xero?: string;
  yahoo?: string;
  yammer?: string;
  yandex?: string;
  zoom?: string;
  [property: string]: any;
}

declare interface ObjectManagedAccount {
  application?: string;
  password?: string;
  signinUrl?: string;
  username?: string;
  [property: string]: any;
}

declare interface ObjectMfaProps {
  countryCode?: string;
  enabled?: boolean;
  isPreferred?: boolean;
  mfaType?: string;
  recoveryCodes?: string[];
  secret?: string;
  url?: string;
  [property: string]: any;
}

declare interface ObjectPermission {
  actions?: string[];
  adapter?: string;
  approver?: string;
  approveTime?: string;
  createdTime?: string;
  description?: string;
  displayName?: string;
  domains?: string[];
  effect?: string;
  groups?: string[];
  isEnabled?: boolean;
  model?: string;
  name?: string;
  owner?: string;
  resources?: string[];
  resourceType?: string;
  roles?: string[];
  state?: string;
  submitter?: string;
  users?: string[];
  [property: string]: any;
}

declare interface ObjectRole {
  createdTime?: string;
  description?: string;
  displayName?: string;
  domains?: string[];
  groups?: string[];
  isEnabled?: boolean;
  name?: string;
  owner?: string;
  roles?: string[];
  users?: string[];
  [property: string]: any;
}

declare type UserPayload = { id: string };

declare type SuperReq = {
  user: UserPayload;
};
