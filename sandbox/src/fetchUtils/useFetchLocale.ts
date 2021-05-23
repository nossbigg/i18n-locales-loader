import { useEffect, useState } from "react";

export const useFetchLocale = (localeUrl: any) => {
  const [data, setData] = useState<any>(undefined);

  useEffect(() => {
    const doWork = async () => {
      const res = await fetch(localeUrl);
      const resJson = await res.json();
      setData(resJson);
    };
    doWork();
  }, [localeUrl]);

  return data;
};
