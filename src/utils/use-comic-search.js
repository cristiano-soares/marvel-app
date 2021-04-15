import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useComicSearch(query, pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [comics, setComics] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setComics([])
  }, [query])

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    let offset = 0;
    const limit = 20;
    if (pageNumber > 1) {
      offset = pageNumber * limit;
    }
    const params = {
      'apikey': '44db65d7e1952869be0451a4c5426eda',
      'hash': 'ffd275c5130566a2916217b101f26150',
      'limit': limit,
      'offset': offset,
      'orderBy': 'title',
      'noVariants': true
    }

    if (query) {
      params.titleStartsWith = query;
    }
    axios({
      baseURL: 'https://gateway.marvel.com/v1/public/comics',
      params,
      timeout: 10000,
      method: 'get',
      responseType: 'json',
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      const results = res.data.data.results;
      setComics(prevComics => {
        return [...new Set([...prevComics, ...results])];
      });
      setHasMore(results.length > 0);
      setLoading(false);
    }).catch(e => {
      if (axios.isCancel(e)) return
      setError(true);
      setLoading(false);
    });
    return () => cancel()
  }, [query, pageNumber])

  return { loading, error, comics, hasMore }
}