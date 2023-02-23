declare module TranslateApi {
  interface baiduRequest {
    // 谷歌翻译
    q?: string[]; // 翻译文字
    target?: string; // 翻译目标
  }
  interface baiduResultDataItem {
    /**文本 */
    translatedText: string;
    /**文本翻译语种 */
    detectedSourceLanguage: string;
  }
  interface baiduResultData {
    translations?: baiduResultDataItem[];
  }
  interface baiduResult {
    // 谷歌翻译
    translations: baiduResultData; // 翻译文字
  }
}

declare module 'js-md5';
