import { useEffect, useState } from "react";

export function useAdmissions(params:any) {
  const [data, setData] = useState<any[]>([]);
  const [meta, setMeta] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);

      const query = new URLSearchParams(params).toString();
      const res = await fetch(`/api/admission?${query}`);
      const json = await res.json();

      // backend should return:
      // { data:[], total, page, last_page }
      setData(json.data);
      setMeta(json);
      setLoading(false);
    }

    load();
  }, [JSON.stringify(params)]);

  return { data, meta, loading };
}
