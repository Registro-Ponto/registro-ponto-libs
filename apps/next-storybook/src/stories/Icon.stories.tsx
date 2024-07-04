import type { Meta, StoryObj } from '@storybook/react'

import * as icons from '../../../../rp-icons/icons/'

type IconProps = { className: string, size: number }

const Component = ({ className, size }: IconProps) => {
    return (
      <div className="grid grid-cols-8 gap-2">
        {Object.entries(icons).map(([iconName, IconComponent]) => {
          return (
            <div key={iconName} className="flex flex-col items-center gap-2">
              <IconComponent className={className} width={size} height={size} />
              <span className="text-4xs">{iconName}</span>
            </div>
          )
        })}
      </div>
    )
  }

export default {
  title: 'Components/Icon',
  component: Component,
  args: {
    className: 'text-blue-800',
    size: 34,
  },
  argTypes: {
    className: {
      table: {
        disable: true,
      },
    },
  },
} as Meta<IconProps>

export const AllIcons: StoryObj<IconProps> = {
  parameters: {
    controls: {
      exclude: ['size'],
    },
  },
}

export const CustomSize: StoryObj<IconProps> = {
  args: {
    size: 24,
  },
  argTypes: {
    size: {
      control: {
        type: 'range',
        min: 8,
        max: 34,
        step: 2,
      },
    },
  },
}

test()

function test() {
  return 4
}