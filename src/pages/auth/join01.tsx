import Image from 'next/image';
import CheckBox from '@components/common/Checkbox';
import Layout from '@components/common/Layout';
import Button from '@components/common/Button';
import Navigate from '@components/common/Navigate';
import tw from 'tailwind-styled-components';
import arrowBtn from '@public/svg/icons/icon_arrow.svg';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '@features/hooks';
import { setIsApprovePromotion } from '@features/user/userSlice';
interface defaultProps {
  [key: string]: any;
}

const CheckBoxList = tw.li<defaultProps>`
pb-[18px] flex justify-between
`;

export default function Join01() {
  const router = useRouter();

  const handleLeftButton = () => {
    router.back();
  };
  const handleRightButton = () => {
    router.push('/auth/login');
  };

  const [checkedTerm, setCheckedTerm] = useState<string[]>([]);

  const onCheckedAll = (checked: boolean): void => {
    if (checked) {
      setCheckedTerm(() => ['term1', 'term2', 'term3', 'term4']);
    } else if (
      (!checked && checkedTerm.includes('term1')) ||
      (!checked && checkedTerm.includes('term2')) ||
      (!checked && checkedTerm.includes('term3')) ||
      (!checked && checkedTerm.includes('term4'))
    ) {
      setCheckedTerm(() => []);
    }
  };
  const onChecked = (checked: boolean, id: string): void => {
    if (checked) {
      setCheckedTerm(() => [...checkedTerm, id]);
    } else if (!checked && checkedTerm.includes(id)) {
      setCheckedTerm(() => checkedTerm.filter((el: string) => el !== id));
    }
  };

  const dispatch = useAppDispatch();

  const { handleSubmit } = useForm();
  const onSubmit = () => {
    if (checkedTerm.includes('term4')) {
      dispatch(setIsApprovePromotion(true));
    } else {
      dispatch(setIsApprovePromotion(false));
    }

    if (
      checkedTerm.includes('term1') &&
      checkedTerm.includes('term2') &&
      checkedTerm.includes('term3')
    ) {
      router.push('/auth/join02');
    }
  };

  return (
    <Layout>
      <Navigate
        message="회원가입"
        handleLeftButton={handleLeftButton}
        handleRightButton={handleRightButton}
      />
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className="mt-8 pb-[18px]">
          <CheckBox
            id="selectAll"
            label="전체동의"
            isChecked={checkedTerm.length === 4 ? true : false}
            handler={(e) => onCheckedAll(e.target.checked)}
          />
        </div>
        <div>
          <ul>
            <CheckBoxList>
              <CheckBox
                kind="checkbox"
                id="term1"
                label="아띠즈 이용약관 동의(필수)"
                isChecked={checkedTerm.includes('term1') ? true : false}
                handler={(e) => onChecked(e.target.checked, e.target.id)}
              />
              <button>
                <Image
                  src={arrowBtn}
                  alt="arrowBtn"
                  width={7}
                  height={14}
                ></Image>
              </button>
            </CheckBoxList>
            <CheckBoxList>
              <CheckBox
                id="term2"
                label="개인정보 수집과 이용에 동의(필수)"
                isChecked={checkedTerm.includes('term2') ? true : false}
                handler={(e) => onChecked(e.target.checked, e.target.id)}
              />
              <button>
                <Image
                  src={arrowBtn}
                  alt="arrowBtn"
                  width={7}
                  height={14}
                ></Image>
              </button>
            </CheckBoxList>
            <CheckBoxList>
              <CheckBox
                id="term3"
                label="위치정보 이용약관에 동의(필수)"
                isChecked={checkedTerm.includes('term3') ? true : false}
                handler={(e) => onChecked(e.target.checked, e.target.id)}
              />
              <button>
                <Image
                  src={arrowBtn}
                  alt="arrowBtn"
                  width={7}
                  height={14}
                ></Image>
              </button>
            </CheckBoxList>
            <CheckBoxList>
              <CheckBox
                id="term4"
                label="아띠즈 이벤트와 프로모션 수신 동의(선택)"
                isChecked={checkedTerm.includes('term4') ? true : false}
                handler={(e) => onChecked(e.target.checked, e.target.id)}
              />
              <button>
                <Image
                  src={arrowBtn}
                  alt="arrowBtn"
                  width={7}
                  height={14}
                ></Image>
              </button>
            </CheckBoxList>
          </ul>
        </div>
        <Button className="absolute bottom-[83px] w-[325px]" text="확인" />
      </form>
    </Layout>
  );
}
