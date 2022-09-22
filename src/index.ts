import {
  getAuth as _getAuth,
  getTicket as _getTicket,
  getToken as _getToken,
  setCredentials as _setCredentials,
  setUbiAppId as _setUbiAppId,
  setAuthFileDirPath as _setAuthFileDirPath,
  setAuthFileName as _setAuthFileName,
  setAuthFilePath as _setAuthFilePath,
  getAuthFilePath as _getAuthFilePath
} from './auth';
import _findByUsername from './methods/findByUsername';
import _findById from './methods/findById';
import _getProgression from './methods/getProgression';
import _getPlaytime from './methods/getPlaytime';
import _getRanks from './methods/getRanks';
import _getStats from './methods/getStats';
import _getStatus from './methods/getStatus';
import _getUserStatus from './methods/getUserStatus';
import _getProfileApplications from './methods/getProfileApplications';
import _getApplications from './methods/getApplications';
import _validateUsername from './methods/validateUsername';
import _custom from './methods/custom';
import _getNews from './methods/getNews';
import _getNewsById from './methods/getNewsById';
import { UUID, Platform, PlatformAll, PlatformAllExtended } from './typings';

export { default as fetch } from './fetch';
export * as typings from './typings';
export * as constants from './constants';
export * as utils from './utils';

const checkQueryLimit = <T extends (...args: any) => any>(
  method: T,
  query: QueryUUID | QueryString,
  limit: number,
  platform?: PlatformAllExtended,
  options?: any,
): ReturnType<T> => {
  const queryArray = Array.isArray(query) ? query : [query];
  if (queryArray.length > limit)
    return Promise.reject(
      new TypeError(`You can't pass more than ${limit} ids/usernames`)
    ) as ReturnType<T>;
  return platform ? method(platform, queryArray, options) : method(queryArray, options);
};

type QueryUUID = UUID | UUID[];
type QueryString = string | string[];

export class R6api {

  public constructor(email?: string,
    password?: string,
    ubiAppId?: string,
    authFileDirPath?: string,
    authFileName?: string,
    authFilePath?: string,
  ) {
    if (email && password) _setCredentials(email, password);
    if (ubiAppId) _setUbiAppId(ubiAppId);
    if (authFileDirPath) _setAuthFileDirPath(authFileDirPath);
    if (authFileName) _setAuthFileName(authFileName);
    if (authFilePath) _setAuthFilePath(authFilePath);
  }

  /** Find player by their username. */
  public findByUsername(platform: PlatformAll, query: QueryString) {
    return checkQueryLimit(_findByUsername, query, 50, platform);
  }

  /** Find player by their id. */
  public findById(platform: PlatformAllExtended, query: QueryUUID | QueryString, options?: any) {
    return checkQueryLimit(_findById, query, 50, platform, options)
  }

  /** Get playtime of a player. */
  public getPlaytime(platform: Platform, query: QueryUUID) {
    return checkQueryLimit(_getPlaytime, query, 200, platform)
  }

  /** Get level, xp and alpha pack drop chance of a player. */
  public getProgression(platform: Platform, query: QueryUUID) {
    return checkQueryLimit(_getProgression, query, 200, platform)
  }

  /** Get seasonal stats of a player. */
  public getRanks(platform: Platform, query: QueryUUID, options?: any) {
    return checkQueryLimit(_getRanks, query, 200, platform, options)
  }

  /** Get summary stats of a player. */
  public getStats(platform: Platform, query: QueryUUID, options?: any) {
    return checkQueryLimit(_getStats, query, 200, platform, options)
  }

  /** Get Rainbow Six: Siege servers status. */
  public apiGetStatus() { return _getStatus(); }
  /** Get status of a player. */
  public getUserStatus(query: QueryUUID, options?: any) {
    return checkQueryLimit(_getUserStatus, query, 50, undefined, options)
  }

  /** Get information about applications of a player. */
  public getProfileApplications(query: QueryUUID, options?: any) {
    return checkQueryLimit(_getProfileApplications, query, 100, undefined, options)
  }
  /** Get information about applications. */
  public getApplications(query: QueryUUID) {
    return checkQueryLimit(_getApplications, query, 50)
  }

  /** Validate username. */
  public validateUsername(username: string) { return _validateUsername(username) }
  /** Useful if you're familiar with Rainbow Six Siege's API; this method will make a request to a custom URL you would provide with the token in the header. */
  public custom(url: string, options?: any) { return _custom(url, options) }
  /** Get Rainbow Six: Siege News. */
  public getNews(options?: any) { return _getNews(options); }
  /** Get Rainbow Six: Siege News by ID. */
  public getNewsById(id: string, options?: any) { return _getNewsById(id, options) }

  public apiGetAuth() { return _getAuth(); }
  public apiGetTicket() { return _getTicket(); }
  public apiGetToken() { return _getToken(); }
  public apiSetCredentials(email: string, password: string) { _setCredentials(email, password) }
  public apiSetUbiAppId(_ubiAppId: string) { _setUbiAppId(_ubiAppId) }
  public apiSetAuthFileDirPath(path: string) { _setAuthFileDirPath(path) }
  public apiSetAuthFileName(name: string) { _setAuthFileName(name) }
  public apiSetAuthFilePath(path: string) { _setAuthFilePath(path) }
  public apiGetAuthFilePath() {
    return _getAuthFilePath();
  }

}

export default R6api
