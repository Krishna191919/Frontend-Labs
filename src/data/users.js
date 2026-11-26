export const users = [
  {
    id: 1,
    name: 'Sita Gurung',
    email: 'sita@example.com',
    role: 'customer',
    avatar: 'https://i.pravatar.cc/96?img=5',
    bio: 'Loves hiking and frontend design.',
  },
  {
    id: 2,
    name: 'Ram Sharma',
    email: 'ram@example.com',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/96?img=12',
    bio: 'Keeps the API safe and the deploys green.',
  },
  {
    id: 3,
    name: 'Hari Thapa',
    email: 'hari@example.com',
    role: 'customer',
    avatar: 'https://i.pravatar.cc/96?img=33',
    bio: 'Coffee, code, repeat.',
  },
  {
    id: 4,
    name: 'Gita Rai',
    email: 'gita@example.com',
    role: 'customer',
    avatar: 'https://i.pravatar.cc/96?img=47',
    bio: 'Writes tests so you don’t have to.',
  },
  {
    id: 5,
    name: 'Bikash Karki',
    email: 'bikash@example.com',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/96?img=15',
    bio: 'Full-stack tinkerer.',
  },
]

export const getUserById = (id) => users.find((u) => u.id === Number(id))
