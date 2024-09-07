import Featured from "@/components/Hero/Hero";
import styles from "./page.module.css";
import CategoryList from "@/components/CategoryList/CategoryList";
import CardList from "@/components/CardList/CardList";
import Menu from "@/components/menu/Menu";

type searchParamsProps = {
  searchParams: {
    page: string;
  };
};

export default function Home({ searchParams }: searchParamsProps) {
  const page = parseInt(searchParams.page) || 1;
  return (
    <div className={styles.container}>
      <Featured />
      <CategoryList />
      <div className={styles.content}>
        <CardList page={page} category={""} />
        <Menu />
      </div>
    </div>
  );
}
