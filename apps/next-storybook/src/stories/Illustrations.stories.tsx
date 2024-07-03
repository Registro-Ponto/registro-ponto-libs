import { Meta, StoryObj } from '@storybook/react'

import * as illustrations from '../../../../rp-illustrations/illustrations/'

type IllustrationProps = {
  name: keyof typeof illustrations
  size?: number
}

const Component = ({ size }: IllustrationProps) => {
  return (
    <div className="grid grid-cols-8 gap-2">
      {Object.entries(illustrations).map(([illustrationName, Illustration]) => {
        console.log(Illustration)
        return (
          <div key={illustrationName} style={{height: size, width: size}} className="flex flex-col items-center gap-2">
            <Illustration width={size} height={size} />
            <span className="text-4xs">{illustrationName}</span>
          </div>
        )
      })}
    </div>
  )
}

export default {
  title: 'Components/Illustration',
  component: Component,
  args: {
    size: 100,
  },
  argTypes: {
    size: {
      control: {
        type: 'range',
        min: 50,
        max: 150,
        step: 5,
      },
    },
  },
} as Meta<IllustrationProps>

export const AllIllustrations: StoryObj<IllustrationProps> = {}
