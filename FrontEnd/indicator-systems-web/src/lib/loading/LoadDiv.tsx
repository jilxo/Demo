import * as React from 'react';
import {useTheme} from "@mui/material/styles";
import Loading from "./Loading.tsx";
import {isActionOf} from "../../redux/store.tsx";

interface LoadDivProps {
  result: any;
  loading: any;
  error: any;
  children: any;
}

export default function LoadDiv({result, loading, error, children}: LoadDivProps) {

  const theme = useTheme()

  if (!result || isActionOf(result.action, loading))
    return <Loading></Loading>;

  if (isActionOf(result.action, error)) {
    return <div style={{color: theme.palette.error.light}}>{result.messageUser}</div>;
  }

  return <>{children}</>;
}
