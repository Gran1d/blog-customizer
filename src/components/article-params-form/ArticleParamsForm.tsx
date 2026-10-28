import clsx from 'clsx';
import { useEffect, useState, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';

import {
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
  fontColors,
  fontFamilyOptions,
  fontSizeOptions,
  type ArticleStateType,
} from '../../constants/articleProps';
import { RadioGroup } from '../../ui/radio-group/RadioGroup';
import { Select } from '../../ui/select/Select';
import { Separator } from '../../ui/separator/Separator';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  onChange: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  onChange,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);
  const formRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClickOutside = (e: MouseEvent): void => {
      if (formRef.current?.contains(e.target as Node)) {
        return;
      }
      setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={formRef}>
      <ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      <aside className={clsx(styles.container, { [styles.container_open]: isOpen })}>
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            onChange(formState);
          }}
          onReset={() => {
            setFormState(defaultArticleState);
            onChange(defaultArticleState);
          }}
        >
          <Text
            as={'h2'}
            size={31}
            weight={800}
            fontStyle={'normal'}
            uppercase={true}
            align="left"
            family="open-sans"
          >
            Задайте параметры
          </Text>

          <Select
            selected={formState.fontFamilyOption}
            options={fontFamilyOptions}
            title="Шрифт"
            onChange={(option) =>
              setFormState({ ...formState, fontFamilyOption: option })
            }
          />

          <RadioGroup
            name="font-size"
            selected={formState.fontSizeOption}
            options={fontSizeOptions}
            title="Размер шрифта"
            onChange={(option) => setFormState({ ...formState, fontSizeOption: option })}
          />

          <Select
            selected={formState.fontColor}
            options={fontColors}
            title="Цвет шрифта"
            onChange={(option) => setFormState({ ...formState, fontColor: option })}
          />

          <Separator />

          <Select
            selected={formState.backgroundColor}
            options={backgroundColors}
            title="Цвет фона"
            onChange={(option) =>
              setFormState({ ...formState, backgroundColor: option })
            }
          />

          <Select
            selected={formState.contentWidth}
            options={contentWidthArr}
            title="Ширина контента"
            onChange={(option) => setFormState({ ...formState, contentWidth: option })}
          />

          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </div>
  );
};
