import { Chevron } from 'shared/components/navigation/primary'
import { optionType } from 'shared/utils'
import { Li, Details, Summary, SumButton, SumDiv, Deg } from 'shared/components/workbench/menu'
import { useTranslation } from 'next-i18next'
import { values } from 'shared/components/workbench/menu/design-options/option-value'
import { inputs } from 'shared/components/workbench/menu/design-options/option-input'

const Option = (props) => {
  const { t } = useTranslation([`o_${props.design.designConfig.data.name}`])
  const opt = props.design.patternConfig.options[props.option]
  const type = optionType(opt)
  const Input = inputs[type]
  const Value = values[type]

  try {
    const hide = opt.hide && opt.hide(props.draft.settings)

    if (hide) return null
  } catch (e) {
    console.warn(`error occurred in hide method for ${props.option}, so we'll just show it`, e)
  }

  if (type === 'bool') {
    const toggleBoolean = () => {
      const dflt = opt.bool
      const current = props.gist?.options?.[props.option]
      const newVal = typeof current === 'undefined' ? !dflt : !current
      props.updateGist(['options', props.option], newVal)
    }

    return (
      <Li>
        <SumButton onClick={toggleBoolean}>
          <SumDiv>
            <Deg />
            <span>{t(`${props.option}.t`)}</span>
          </SumDiv>
          <Value type={type} {...props} t={t} />
        </SumButton>
      </Li>
    )
  }

  return (
    <Li>
      <Details>
        <Summary>
          <SumDiv>
            <Deg />
            <span>{t(`${props.option}.t`)}</span>
          </SumDiv>
          <Value type={type} {...props} t={t} />
          <Chevron w={6} m={3} />
        </Summary>
        <Input {...props} ot={t} />
      </Details>
    </Li>
  )
}

export default Option
