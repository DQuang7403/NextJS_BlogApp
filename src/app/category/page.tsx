import CardList from "@/components/CardList/CardList";
import styles from "./CategoryPage.module.css";
import Menu from "@/components/menu/Menu";

type searchParamsProps = {
  searchParams: {
    page: string;
    category: string;
  };
};


export default function page({ searchParams }: any) {
  const page = parseInt(searchParams.page) || 1;
  const { category } = searchParams as { category: string };
  return (
    <div>
      <h1 className={styles.title}>{category} Page</h1>
      <div className={styles.content}>
        <CardList page={page} category={category} />
        <Menu />
      </div>
    </div>
  );
}
