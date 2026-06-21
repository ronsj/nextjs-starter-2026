type GreetingProps = {
  name: string
}

export function Greeting({ name }: GreetingProps) {
  return (
    <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
      <h1 className="max-w-xs text-3xl leading-10 font-semibold tracking-tight text-black dark:text-zinc-50">
        Welcome back, {name}
      </h1>
      <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        You&apos;re signed in and ready to go.
      </p>
    </div>
  )
}
