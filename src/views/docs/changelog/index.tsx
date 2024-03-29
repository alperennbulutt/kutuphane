import Page from '../../../components/Page';
import ReadMdFile from '../../../components/ReadMdFile';
// @ts-ignore
import content from './content.md';

// ----------------------------------------------------------------------

export default function DocsChangelog() {
  return (
    <Page title="Documentation: Changelog | Minimal-UI">
      <ReadMdFile content={content} />
    </Page>
  );
}
