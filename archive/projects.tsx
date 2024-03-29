import Link from 'next/link'

const posts = [
  {
    title: 'Project Manager',
    // href: '#',
    category: { name: 'Project', href: '#' },
    description: (
      <ul>
        <li>Codebases are detail agnostic, we need more info about which project it is</li>
        <li>What if I can know which codebase I&apos;m working on or editing</li>
      </ul>
    ),
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    imageUrl:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
  },
]

const Projects = () => {
  return (
    <div>
      <h1 className="text-2xl">Projects</h1>

      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mx-auto mt-8 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <div key={`post ${post.title}`} className="flex flex-col overflow-hidden rounded-lg border">
              <div className="flex flex-1 flex-col justify-between bg-white p-6">
                <div className="flex-1">
                  <div className="mt-2 block">
                    <p className="text-xl font-semibold text-gray-900">{post.title}</p>

                    <p className="text-sm font-medium ">
                      <Link href="/projects" passHref>
                        <a className="hover:underline">{post.category.name}</a>
                      </Link>
                    </p>
                    <p className="mt-3 text-base text-gray-500">{post.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Projects
