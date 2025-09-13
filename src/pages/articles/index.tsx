import { GetStaticProps, NextPage } from "next";
import SortableTable from "../../components/table/SortableTable";
import data from "../../utils/dummydata";
import styles from "./Articles.module.scss"; // 需要创建这个样式文件

// 扩展接口以包含状态字段
interface ArticlesInterface {
  id: string;
  title: string;
  authors: string;
  source: string;
  pubyear: string;
  doi: string;
  claim: string;
  evidence: string;
  moderationStatus?: string; // 添加可选的审核状态字段
  analysisStatus?: string;   // 添加可选的分析状态字段
}

type ArticlesProps = {
  articles: ArticlesInterface[];
};

const Articles: NextPage<ArticlesProps> = ({ articles }) => {
  const headers: { key: keyof ArticlesInterface; label: string }[] = [
    { key: "title", label: "Title" },
    { key: "authors", label: "Authors" },
    { key: "source", label: "Source" },
    { key: "pubyear", label: "Publication Year" },
    { key: "doi", label: "DOI" },
    { key: "claim", label: "Claim" },
    { key: "evidence", label: "Evidence" },
    { key: "moderationStatus", label: "Moderation Status" }, // 添加审核状态列
    { key: "analysisStatus", label: "Analysis Status" },     // 添加分析状态列
  ];

  return (
    <div className="container">
      <h1>Articles Index Page</h1>
      <p>Page containing a table of articles:</p>
      <SortableTable headers={headers} data={articles} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<ArticlesProps> = async (_) => {
  // Map the data to ensure all articles have consistent property names
  const articles = data.map((article) => ({
    id: article.id ?? article._id,
    title: article.title,
    authors: article.authors,
    source: article.source,
    pubyear: article.pubyear,
    doi: article.doi,
    claim: article.claim,
    evidence: article.evidence,
    moderationStatus: article.moderationStatus || "pending", // 添加默认审核状态
    analysisStatus: article.analysisStatus || "not-analyzed", // 添加默认分析状态
  }));

  return {
    props: {
      articles,
    },
  };
};

export default Articles;