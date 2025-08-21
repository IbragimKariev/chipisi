import { Drawer } from 'antd';
import { useTranslation } from 'react-i18next';
interface IProps {
    show: boolean;
    task: any;
    onHide: () => void;
}
export const SideDrawerSecond = (props: IProps) => {
    const { t } = useTranslation();
    const task = props.task;
    return (
        <>
            <Drawer
                title="Подробнее"
                placement="right"
                size="large"
                onClose={props.onHide}
                open={props.show}
            >
                <div className="appeal_inf">
                    <p>
                        <span>{t('status')}:</span> {task.statusId?.name}
                    </p>
                    <hr style={{ marginBottom: 10 }} />
                    <p>
                        <span>{t('category_1')}:</span>{' '}
                        {task.objectOfWorkId?.category1?.name}
                    </p>

                    <hr style={{ marginBottom: 10 }} />
                    <p>
                        <span>{t('category_2')}:</span>{' '}
                        {task.objectOfWorkId?.category2?.name}
                    </p>
                    <hr style={{ marginBottom: 10 }} />
                    <p>
                        <span>{t('category_3')}:</span>{' '}
                        {task.objectOfWorkId?.category3?.name}
                    </p>
                    <hr style={{ marginBottom: 10 }} />
                </div>
            </Drawer>
        </>
    );
};
