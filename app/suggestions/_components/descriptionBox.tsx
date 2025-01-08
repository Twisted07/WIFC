export const DescriptionBox = ({ heading, content = "", type }: { heading: string, content: string, type?: string }) => {
  return (
    <article className='mt-5'>
      <h1 className='text-lg font-semibold pb-3 border-b-2 border-b-gray-200 mb-3'>{heading}</h1>
      {
        type === 'textarea' ? (
          <textarea className='italic tracking-wide bg-transparent w-full resize-none' rows={15} value={content} disabled></textarea>
        ) : (
          <p className='italic tracking-wide'>{content}</p>
        )
      }
    </article>
  );
}