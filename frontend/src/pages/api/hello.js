// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { useFetchData } from "./useFetchData";

export default function handler(req, res) {
  const { data, isLoading } = useFetchData();
  res.status(200).json({ data, isLoading });
}
