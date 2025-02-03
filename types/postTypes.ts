
export interface Post {
    id: number
    author: Author
    title: string
    content: string
    images: string[]
    mentions: string[]
    tags: string[]
    employee: Employee
    is_editable: boolean
    timestamp: string
    metrics: Metrics
    viewedBy: ViewedBy[]
    likedBy: LikedBy[]
    comments: Comment[]
}

export interface Author {
    name: string
    email: string
    role: string[]
    jobcode: string
    avatar: any
}

export interface Employee {
    id: number
    name: string
    email: string
    role: string[]
    jobcode: string
}

export interface Metrics {
    likes: number
    views: number
    commentsCount: number
}

export interface ViewedBy {
    userId: number
    name: string
    email: string
    role: string[]
    jobcode: string
}

export interface LikedBy {
    userId: number
    name: string
    email: string
    role: string[]
    jobcode: string
}

export interface Comment {
    id: number
    author: Author
    content: string
    timestamp: string
    likes: number
    likedBy: LikedBy[]
}

export interface Pagination {
    currentPage: number
    totalPages: number
    pageSize: number
    totalPosts: number
    hasNextPage: boolean
    hasPreviousPage: boolean
}

export interface LastMonthAchiever {
    id: number
    username: string
    email: string
    jobcode: string
    role: string[]
    total_sales: string
  }