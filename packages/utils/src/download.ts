import dayjs from 'dayjs';
import axios from 'axios';

/**
 * 导出blob格式文件
 * @param { Blob } data 文件流
 * @param { String } name 文件名
 * @param { String } type 文件类型
 */
export const downloadFileByBlob = (data: Blob, name: string, type = 'xlsx') => {
  return new Promise((resolve) => {
    if (!data) {
      return resolve;
    }
    const url = URL.createObjectURL(
      new Blob([data], {
        type: 'application/octet-stream',
      }),
    );
    const link = document.createElement('a');
    link.href = url;
    link.download = `${name}_${dayjs().format('YYYYMMDDHHmmss')}.${type}`;
    link.click();
    URL.revokeObjectURL(url);
    resolve(url);
  });
};

/**
 * 导出本地文件
 * @param {string} href 路径
 * @param {function} transform 转换data
 */
export function downloadLocationFile(href: string, transform?: (res: any) => Blob) {
  axios
    .request({
      url: href,
      method: 'get',
      responseType: 'blob',
    })
    .then((res: any) => {
      const fileName = href.replace(/(.*\/)*([^.]+).*/gi, '$2');
      downloadFileByBlob(transform ? transform(res.data) : res.data, fileName);
    });
}
