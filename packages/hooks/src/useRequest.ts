import type { Ref, ComputedRef } from 'vue';
import { ref, reactive, unref, onMounted } from 'vue';

const CANCEL_MARK = '__CANCEL__';

type Awaited<T> = T extends PromiseLike<infer U> ? U : T;
type ArgsType<T> = T extends (args: infer U) => any ? U : never;

interface RequestParams<R, P, T> {
  request: R; // 请求接口
  requestData?: ComputedRef<P> | Ref<P> | P; // 请求参数
  filterData?: (res: T) => any; // 过滤data
  pageNo?: number; // 当前页数
  pageSize?: number; // 每页条数
  immediate?: boolean; // 是否立即执行
  successCallback?: (result: T) => void; // 成功回调
  failCallback?: (error: unknown) => void; // 失败回调
}

/**
 * 发起请求
 * @param options
 */
export function useRequest<R extends (arg: any) => Promise<any>, P = ArgsType<R>, T = Awaited<ReturnType<R>>>({
  request,
  requestData,
  filterData,
  pageNo = 1,
  pageSize = 20,
  immediate = true,
  successCallback,
  failCallback,
}: RequestParams<R, P, T>) {
  const pageOption = reactive({
    pageNo: pageNo,
    pageSize: pageSize,
    total: 0,
  });
  const loading = ref<boolean>(false);
  const dataSource = ref<any[]>([]);

  async function loadData(reset = false) {
    if (reset) pageOption.pageNo = pageNo;

    try {
      loading.value = true;
      const result = await request({
        pageNo: pageOption.pageNo,
        pageSize: pageOption.pageSize,
        ...unref(requestData),
      });
      dataSource.value = filterData ? filterData(result) : result.items;
      pageOption.total = result.totalCount;
      successCallback && successCallback(result);
      loading.value = false;
      return result;
    } catch (error) {
      failCallback && failCallback(error);
      // 如果是cancel pending，则不处理当前的loading状态
      const { message } = error as { message: string };
      if (!message.includes(CANCEL_MARK)) loading.value = false;
    }
  }

  const handlePageChange = (pageNo?: number, pageSize?: number) => {
    pageOption.pageNo = pageNo ?? pageOption.pageNo;
    pageOption.pageSize = pageSize ?? pageOption.pageSize;
    loadData();
  };

  onMounted(() => {
    immediate && loadData(true);
  });

  return {
    loadData,
    loading,
    dataSource,
    pageOption,
    handlePageChange,
  };
}
