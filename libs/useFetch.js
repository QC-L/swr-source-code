import { useState, useEffect } from 'react'

/**
 * 对 fetch 进行封并返回 isLoading、isError、data 三个值
 * @param {*} url 请求的 API 地址
 * @param {*} initialData 初始化数据
 */
function useFetch(url, fetcher) {
  const [data, setData] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false)

  let fn = () => {};
  if(typeof fetcher === 'function') {
    fn = fetcher
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false)
      setIsLoading(true)

      try {
        const newData = await fn(url);
        setData(newData)
      } catch(error) {
        setIsError(false)
      }

      setIsLoading(false)
    }

    fetchData()
  }, [url])

  return [data, isLoading, isError]
}

export default useFetch;
