import i18next from "i18next";
import "./changeLang.css";
import { getCookie } from 'typescript-cookie';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';
import { AuthSliceMethods } from '../../redux/slices/authSlice';
import { Navigate } from 'react-router-dom';
import { createFromIconfontCN, LogoutOutlined } from '@ant-design/icons';
import { AppDispatch } from '../../redux/root/root.store';
import { useDispatch } from 'react-redux';

const { Option } = Select;

export const ChangeLang = () => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  
  const handleLogout = async () => {
    dispatch(AuthSliceMethods.logout());
    <Navigate to="/login" />;
  };
  const handleLanguageChange = (language: any) => {
    i18next.changeLanguage(language);
  };

  return (
    <div className="change_lang">

      <Select
        className='changeLang'
        style={{ minWidth: 100, marginRight: 5 }}
        value={getCookie("i18next")}
        onChange={handleLanguageChange}
      >
        <Option value="ky">Кырг</Option>
        <Option value="ru">Русс</Option>
      </Select>
      <button onClick={() => { handleLogout() }}>{t('logout')} <LogoutOutlined /></button>
    </div>
  );
};

