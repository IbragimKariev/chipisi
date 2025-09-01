import { Select, Spin } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ISelectOption } from "../../models/utils/selectOption";
import { defaultFilterOption } from "../../utils";
import { useGetActiveCompaniesQuery } from "../../redux/api/endpoints/companyApi";

interface IProps {
  value?: number | null;
  onChange?: (value: number | null) => void;
  parentNull?: boolean;
}

const SelectCompany = (props: IProps) => {
  const { t } = useTranslation();
  const [options, setOptions] = useState<ISelectOption[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 20;

  const { data, isLoading, isFetching } = useGetActiveCompaniesQuery({
    page,
    pageSize,
  });

  useEffect(() => {
    console.log(data);
    if (data) {
      const newOptions =
        data?.items?.map((a: any) => ({
          label: a.name,
          value: a.id,
        })) || [];

      if (page === 1) {
        setOptions(newOptions);
      } else {
        setOptions((prev) => [...prev, ...newOptions]);
      }

      // Проверяем, есть ли еще данные для загрузки
     setHasMore((data.total ?? 0) > page * pageSize);
    }
  }, [data, page]);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;

    // Проверяем, достигли ли мы нижней части списка
    const isNearBottom =
      target.scrollTop + target.offsetHeight >= target.scrollHeight - 10;

    if (!isFetching && hasMore && isNearBottom) {
      setPage((prev) => prev + 1);
    }
  };
  return (
    <Select
      placeholder={t("selectPlaceholder")}
      loading={isLoading}
      value={props.value}
      onChange={props.onChange}
      options={options}
      filterOption={defaultFilterOption}
      showSearch
      allowClear
      onPopupScroll={handleScroll}
      notFoundContent={isFetching ? <Spin size="small" /> : null}
    />
  );
};

export default SelectCompany;
