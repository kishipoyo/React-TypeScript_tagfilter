/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { tagsGrid, articleGrid } from "./emotionCss";

type article = {
  title: string;
  tags: string[];
  cotent: string;
};

export default function App() {
  // タグ初期値
  const array: Array<string> = Array.of(
    "java",
    "javascript",
    "gatsby",
    "react",
    "css",
    "emotion"
  );

  // 記事初期値
  const list: Array<article> = Array.of(
    { title: "記事1", tags: ["java"], cotent: "aaaa" },
    { title: "記事2", tags: ["react", "javascript"], cotent: "bbbbbb" },
    { title: "記事3", tags: ["emotion"], cotent: "cccc" },
    { title: "記事4", tags: ["javascript"], cotent: "ddd" },
    { title: "記事5", tags: ["css"], cotent: "ee" },
    { title: "記事6", tags: ["gatsby"], cotent: "f" }
  );

  // 選択中タグのstate
  const [selectedTag, selectTag] = useState<Array<string>>([]);
  // タグ検索結果のstate
  // 初期値は全記事
  const [searchResult, doSearch] = useState<Array<article>>(list);

  //選択されたタグで記事を抽出する
  // useStateと同じイベントで書くと同じイベント内ではstateが更新されないためうまく行かない
  // そのため抽出処理はuseEffectで書く
  useEffect(() => {
    // 検索結果記事を抽出する
    doSearch((prevList) => {
      // タグに一致する記事をfilterで抽出
      let newList = prevList.filter((obj) => {
        // everyを使って選択中のタグを全て持っている
        // 記事を抽出
        // ※everyは実行する関数の結果が全てtrueの場合のみtrueが返される
        let result = selectedTag.every((tag) => {
          // 選択中タグが記事のタグ内にあるかfindで探す
          // findの結果はあればその値が返却される
          const findResult = obj.tags.find((kijiTag) => kijiTag === tag);
          // find結果が存在する場合はtrueで返却
          // ここが全てtrueの時にresultがtrueになる
          if (findResult) {
            return true;
          } else {
            return false;
          }
        });
        // 選択中タグを全て含む記事をtrueとして返却
        return result;
      });
      return newList;
    });

    console.log("start");

    // クリーンアップ処理
    return () => {
      // 検索結果を初期状態に戻す
      doSearch(() => list);
      console.log("clean");
    };
    // タグが選択された時に実行する
  }, [selectedTag]);

  // タグ選択処理
  const push = (e: any) => {
    e.preventDefault();

    // タグが既に選択済かチェックする
    const check = selectedTag.find((tag) => {
      return tag === e.target.id;
    });

    if (!check) {
      //未選択の場合は追加
      selectTag((selected) => [...selected, e.target.id]);
    } else {
      // 選択済の場合は削除
      // filterで選択したタグ以外のlistを作り直す
      selectTag((selected) => selected.filter((tag) => tag !== e.target.id));
    }
  };

  // タグ選択時のスタイル変更
  const grigItem = (selectTag: string[], select: string) => {
    // 選択したタグが既に選択済かチェック
    const count = selectTag.filter((selected) => select === selected);
    // 選択してない場合はスタイル追加
    if (count.length !== 0) {
      return [
        css`
          background-color: red;
        `
      ];
    }
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>タグ</h2>
      <div css={[tagsGrid]}>
        {array.map((val, i) => (
          <button
            key={i}
            id={val}
            css={[grigItem(selectedTag, val)]}
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              push(e)
            }
          >
            {val}
          </button>
        ))}
      </div>
      <h2>記事</h2>
      <div css={[articleGrid]}>
        {searchResult.map((kiji, i) => (
          <div key={i}>
            <h2>{kiji.title}</h2>
            <div
              css={[
                css`
                  height: 50px;
                `
              ]}
            >
              {kiji.tags.map((tag) => (
                <div>{tag}</div>
              ))}
            </div>
            <h3>{kiji.cotent}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
