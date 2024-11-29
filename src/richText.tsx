interface RichTextItem {
    text: string;
    link?: string;
  }

// Can be either a string or an array of RichTextItems
type DetailItem = string | RichTextItem[];

const renderRichText = (detail: DetailItem) => {
    if (typeof detail === 'string') {
      return detail;
    }
  
    return detail.map((item, index) => (
      item.link ? (
        <a 
          key={index}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 hover:underline font-normal"
        >
          {item.text}
        </a>
      ) : (
        <span key={index}>{item.text}</span>
      )
    ));
  };

export default renderRichText;
export type { DetailItem };