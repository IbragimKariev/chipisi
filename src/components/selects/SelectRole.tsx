import { Select } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ISelectOption } from "../../models/utils/selectOption";
import { defaultFilterOption } from "../../utils";
import { useGetActiveRolesQuery } from "../../redux/api/endpoints/rolesApi";

interface IProps {
  value?: number | null;
  onChange?: () => void;
  parentNull?: boolean;
}

const SelectRole = (props: IProps) => {
  const { t } = useTranslation();
  const [rolesOptions, setRolesOptions] = useState<ISelectOption[]>(
    []
  );
  const { data, isLoading } = useGetActiveRolesQuery();
  useEffect(() => {
    const serviceTypes = data;
    if (serviceTypes === undefined || serviceTypes === null)
    setRolesOptions([]);
    else {
      let options = [];
        options = serviceTypes.map((a: any) => {
          return { label: a.name, value: a.id };
        });
      
      setRolesOptions(options);
    }
  }, [data]);

  return (
    <Select
      placeholder={t("selectPlaceholder")}
      loading={isLoading}
      value={props.value}
      onChange={props.onChange}
      options={rolesOptions}
      filterOption={defaultFilterOption}
      showSearch
      allowClear
    />
  );
};

export default SelectRole;