import { Fragment } from 'react'
import themes from 'shared/themes/index.js'
import ThemeIcon from 'shared/components/icons/theme.js'
import { useTranslation } from 'next-i18next'
import { Popover, Transition } from '@headlessui/react'
import DownIcon from 'shared/components/icons/down'

const ThemePicker = ({ app, className, iconOnly = false, bottom = false }) => {
  const { t } = useTranslation(['themes', 'common'])

  return (
    <Popover className="relative">
      {() => (
        <>
          <Popover.Button
            className={`group border-0 inline-flex items-center px-3 py-2 text-base font-medium text-neural-content rounded-lg px-4 hover:text-secondary-focus`}
          >
            <ThemeIcon />
            {!iconOnly && <span className="ml-4 font-medium capitalize">{t(`common:theme`)}</span>}
            <DownIcon className={`ml-2 h-5 w-5 ${bottom ? 'rotate-180' : ''}`} aria-hidden="true" />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              className={`absolute z-10 mb-3 w-64 transform px-4 sm:px-0 lg:max-w-xl right-0 ${
                iconOnly ? 'translate-x-4' : ''
              } ${bottom ? 'bottom-10' : 'top-12'}`}
            >
              <div className="overflow-hidden rounded-lg shadow-lg">
                <div className="relative grid gap-2 bg-base-100 p-4 grid-cols-1">
                  {Object.keys(themes).map((theme) => (
                    <button
                      data-theme={theme}
                      key={theme}
                      onClick={() => app.setTheme(theme)}
                      className="btn btn-primary"
                    >
                      {t(`${theme}Theme`)}
                    </button>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

export default ThemePicker
