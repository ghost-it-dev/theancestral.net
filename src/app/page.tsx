import getPosts from './requests/posts/getPosts';

export default async function Home() {
  const posts = await getPosts();

  return (
    <>
      {posts.map((post) => (
        <div key={post._id}>
          <span>{post.title}</span>
        </div>
      ))}
    </>
  )
}
