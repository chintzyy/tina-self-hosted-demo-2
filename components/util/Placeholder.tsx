import { Section } from './'

export function Placeholder({message}: {message: string}) {
  return (
    <Section className="border border-danger bg-danger-muted p-4 text-center">
      <p className="mx-auto text-center text-danger">
        {message}
      </p>
    </Section>
  )
}

export default Placeholder
