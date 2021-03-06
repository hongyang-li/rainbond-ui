import { stringify } from "qs";
import request from "../utils/request";
import config from "../config/config";

/*
   源码创建应用
*/
export async function createAppByCode(body = { team_name }) {
  return request(`${config.baseUrl}/console/teams/${body.team_name}/apps/source_code`, {
    method: "post",
    data: {
      group_id: body.group_id,
      code_from: body.code_from,
      service_cname: body.service_cname,
      git_url: body.git_url,
      // 好雨git应用id
      git_project_id: body.git_project_id || "",
      code_version: body.code_version,
      username: body.username,
      password: body.password,
      server_type: body.server_type,
    },
  });
}

/*
   compose创建应用
*/
export async function createAppByCompose(body = { team_name, group_name, yaml_content }) {
  return request(`${config.baseUrl}/console/teams/${body.team_name}/apps/docker_compose`, {
    method: "post",
    data: {
      group_name: body.group_name,
      image_type: "docker_image",
      yaml_content: body.yaml_content,
    },
  });
}

/*
   指定镜像或docuer run 创建应用
*/
export async function createAppByDockerrun(body = {
  team_name,
  group_id,
  docker_cmd,
  service_cname,
  image_type,
}) {
  return request(`${config.baseUrl}/console/teams/${body.team_name}/apps/docker_run`, {
    method: "post",
    data: {
      group_id: body.group_id,
      docker_cmd: body.docker_cmd,
      service_cname: body.service_cname,
      image_type: body.image_type,
      user_name: body.user_name,
      password: body.password,
    },
  });
}

/*
   获取应用检测的事件Id
*/
export function getCreateCheckId(body = { team_name, app_alias }, handleError) {
  return request(`${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/check`, {
    method: "post",
    handleError,
  });
}

/*
	获取应用检测结果
*/
export function getCreateCheckResult(body = { team_name, app_alias, check_uuid }) {
  return request(`${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/check`, {
    method: "get",
    params: {
      check_uuid: body.check_uuid,
    },
  });
}

/*
  获取compose应用创建检测结果
*/
export function getCreateComposeCheckInfo(body = { team_name, group_id, group_id }) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/groups/${body.group_id}/check`,
    {
      method: "post",
      data: {
        compose_id: body.compose_id,
      },
    },
  );
}

/*
  获取compose应用创建检测结果
*/
export function getCreateComposeCheckResult(body = {
  team_name,
  group_id,
  check_uuid,
  group_id,
}) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/groups/${body.group_id}/check`,
    {
      method: "get",
      params: {
        check_uuid: body.check_uuid,
        compose_id: body.compose_id,
      },
    },
  );
}

/*
   构建应用
*/
export function buildApp(body = { team_name, app_alias }) {
  return request(`${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/build`, {
    method: "post",
  });
}

/*
  获取分支
*/
export function getCodeBranchs(body = {
  team_name,
  git_url,
  service_project_id,
  type,
}) {
  return request(`${config.baseUrl}/console/teams/${body.team_name}/code_repo/branchs`, {
    method: "post",
    data: {
      type: body.type,
      service_code_clone_url: body.git_url,
      service_code_id: body.service_project_id,
    },
  });
}

/*
    获取创建应用的check_uuid
*/
export function getCheckuuid(body = { team_name, app_alias }) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/${body.app_alias}/get_check_uuid`,
    {
      method: "get",
    },
  );
}

/*
    获取compose创建应用的check_uuid
*/
export function getComposeCheckuuid(body = { team_name, group_id, compose_id }) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/groups/${body.group_id}/get_check_uuid`,
    {
      method: "get",
      params: {
        compose_id: body.compose_id,
      },
    },
  );
}

/*
   获取云市应用
*/
export function getMarketApp(body = {}) {
  return request(`${config.baseUrl}/console/apps`, {
    method: "get",
    params: body,
  });
}

/*
  从云市安装应用
*/
export async function installApp(body = { team_name, group_id, app_id }) {
  return request(`${config.baseUrl}/console/teams/${body.team_name}/apps/market_create`, {
    method: "post",
    data: {
      group_id: body.group_id,
      app_id: body.app_id,
    },
  });
}

/*
   根据compose_id获取应用
*/
export async function getAppsByComposeId(body = { team_name, compose_id }) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/compose/${body.compose_id}/services`,
    {
      method: "get",
    },
  );
}

/*
   根据compose_id获取compose内容
*/
export async function getComposeByComposeId(body = { team_name, compose_id }) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/compose/${body.compose_id}/content`,
    {
      method: "get",
    },
  );
}

/*
   应用导出状态查询
*/
export function queryExport(body = { team_name, app_id }) {
  const team_name = body.team_name;
  return request(`${config.baseUrl}/console/teams/${team_name}/apps/export`, {
    method: "get",
    params: {
      app_id: body.app_id,
    },
  });
}

/*
   应用导出 console/teams/{team_name}/apps/export
*/
export function appExport(body = { team_name, app_id, format }) {
  const team_name = body.team_name;
  return request(`${config.baseUrl}/console/teams/${team_name}/apps/export`, {
    method: "post",
    data: {
      app_id: body.app_id,
      format: body.format,
    },
  });
}

/*
   获取导出文件
*/
export async function getExport(body = { team_name, app_id, format }) {
  return request(
    `${config.baseUrl}/console/teams/${body.team_name}/apps/export/down?app_id=${
      body.app_id
    }&format=${body.format}`,
    {
      method: "get",
    },
  );
}

/*
   应用包上传
*/
export function uploadApp(body = { team_name }) {
  const team_name = body.team_name;
  return request(`${config.baseUrl}/console/teams/${team_name}/apps/upload`, {
    method: "post",
  });
}

/*
   导入应用包
*/

export function importApp(body = {
  team_name,
  event_id,
  scope,
  file_name,
}) {
  const team_name = body.team_name;
  const event_id = body.event_id;
  return request(`${config.baseUrl}/console/teams/${team_name}/apps/import/${event_id}`, {
    method: "post",
    data: {
      event_id: body.event_id,
      file_name: body.file_name,
      scope: body.scope,
    },
  });
}

/*
   查询包导入状态
*/

export function queryImportApp(body = { team_name, event_id }) {
  const team_name = body.team_name;
  const event_id = body.event_id;
  return request(`${config.baseUrl}/console/teams/${team_name}/apps/import/${event_id}`, {
    method: "get",
  });
}

/*
   批量导入创建目录
*/

export function importDir(body = { team_name }) {
  const team_name = body.team_name;
  return request(`${config.baseUrl}/console/teams/${team_name}/apps/import/dir`, {
    method: "post",
  });
}

/*
   查询本次导入的目录下的文件
*/

export function queryImportDirApp(body = { team_name, event_id }) {
  const team_name = body.team_name;
  return request(`${config.baseUrl}/console/teams/${team_name}/apps/import/dir`, {
    method: "get",
    params: {
      event_id: body.event_id,
    },
  });
}

/*
   查询导入中的文件
*/

export function queryImportingApp(body = { team_name }) {
  const team_name = body.team_name;
  return request(`${config.baseUrl}/console/teams/${team_name}/apps/import/importing-apps`, {
    method: "get",
  });
}
