import React, { useCallback, useEffect } from "react";
import _ from "lodash";
import { Spinner } from "../elements";

const InfinityScroll = (props) => {
  const { callNext, is_next, loading, children } = props;

  const _handleScroll = _.throttle(() => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;

    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.documentElement.scrollTop;
    //브라우저 호환성을 위해
    if (scrollHeight - innerHeight - scrollTop < 200) {
      if (loading) {
        return;
      }
      callNext();
    }
  }, 300);

  const handleScroll = useCallback(_handleScroll, [loading]);
  useEffect(() => {
    if (loading) {
      return;
    }

    if (is_next) {
      window.addEventListener("scroll", handleScroll);
    } else {
      window.removeEventListener("scroll", handleScroll);
    }

    return () => window.removeEventListener("scroll", handleScroll); //clean-up (unmount와 비슷)
  }, [is_next, loading]);
  return <>
  {children}
  {is_next && <Spinner/>}
  </>;
};

InfinityScroll.defaultProps = {
  children: null,
  callNext: () => {},
  is_next: false,
  loading: false,
};
export default InfinityScroll;
