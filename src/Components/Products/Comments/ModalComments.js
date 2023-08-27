import React from 'react';
import useFetch from '../../../Hooks/useFetch';
import { COMMENTS_GET } from '../../../Api/api';
import Comments from './Comments';
import Skeleton from 'react-loading-skeleton';

const ModalComments = ({
  page,
  slug,
  setInfinite,
  userData,
  authorPost,
  allReplies,
  setAllReplies,
}) => {
  const { request, data, loading } = useFetch();

  React.useEffect(() => {
    const getComments = async () => {
      const total = 5;
      const { url, options } = COMMENTS_GET({ page, total, slug });
      const { response, json } = await request(url, options);
      if (response && response.ok && json.length < total) {
        setInfinite(false);
      }
    };
    getComments();
  }, [request, page, slug, setInfinite]);

  const skeletonComments = () => {
    return Array(5)
      .fill()
      .map((e, i) => <Skeleton key={i} />);
  };

  if (loading) return skeletonComments();
  if (!data) return null;
  return (
    <Comments
      allComments={data}
      slug={slug}
      userData={userData}
      authorPost={authorPost}
      allReplies={allReplies}
      setAllReplies={setAllReplies}
    />
  );
};

export default ModalComments;
