export default {
    public: {
        radioOn: 'オン',
        radioOff: 'オフ',
        cancel: 'キャンセル',
        ok: 'オーケー',
        language: '言語',
        inputValue: '値が不可欠、入力してください。',
        fullscreen: {
            title: 'フルスクリーン',
            succeeded: '画面縦向きのロックをオフにして、最高のゲーム体験を楽しむ為に携帯電話を縦に保持してください',
            failed: '全画面モードが起動出来ない、携帯の権限の許可を確認してください',
            unsupported: '今のブラウザはフルスクリーンモードをサポートしないので、他のブラウザを使ってください'
        },
        settings: {
            title: '設置',
            autoFullscreen: '自動フルスクリーン',
            speed: 'リズムアイコンの速さ',
            noteScale: 'アイコンの大きさ',
            judgeOffset: '判定偏移',
            visualOffset: '視覚偏移',
            barOpacity: '長押しラインの濃さ',
            effectVolume: 'SE音量',
            backgroundDim: '背景画像の透明性',
            showSimLine: '同時押しライン',
            beatNote: 'リズムサポート',
            mirror: 'ミラー',
            laneEffect: 'レーンエフェクト',
            resolution: '高分辨率'
        },
        guide: {
            title: 'ようこそ',
            selectLanguage: '初めてサイトにおアクセスされますので。自分に必要な言語を選択してください。他はページの右上にある言語設置で変更もできます。',
            changeSettings: 'これから、ゲームの中に様々な演奏設置を適切に設定することを通して、自分の習慣に合うようになります。もし早めにゲームを楽しむなら、この節をスキップして後で設定することもできます。',
            complete: 'やりますね！ すべての初期設定が完了しました。お楽しみください！',
            next: '下一步',
            skip: '跳过'
        }
    },
    home: {
        play: {
            title: '開始',
            mapSource: '譜面ソース',
            bestdori: {
                title: 'Bestdori',
                mapId: '譜面ID',
                songId: '歌曲ID',
                type: {
                    title: '谱面类型',
                    official: '官方',
                    community: '社区'
                },
                info: {
                    name: '歌曲名',
                    band: '乐队',
                    singer: '歌手',
                    difficulty: '难度',
                    level: '等级',
                    notes: '物量',
                    author: '谱面作者'
                }
            },
            local: {
                title: 'ローカル',
                type: {
                    title: '譜面タイプ',
                    bbb: 'bangbangboom',
                    bd: 'Bestdori'
                },
                mapFile: '譜面ファイル',
                mapSource: '譜面のソースコード',
                mapCover: '譜面カバー',
                songName: {
                    title: '曲名',
                    default: 'テスト譜面'
                },
                musicFile: 'ミュージックファイル'
            },
            start: 'スタート',
            load: '譜面をロード',
            loadFailed: '譜面はロードが失敗した、もう一度お試しください'
        },
        convert: {
            title: '転換する',
            from: '元の譜面パターン',
            to: '転換しての譜面パターン',
            fileInput: '譜面ファイル',
            noInput: 'ファイルまたは譜面がない、一つを選択してください',
            convertResult: '転換の結果',
            succeeded: 'ダウンロード',
            download: 'この操作がファイルに無効、真面目に進行するか',
            serious: '你是沙雕吗？',
            convert: '转换',
            error: {
                multiTap: '在{time}处发现多押，由于目前Bestdori未支持多押，请修改后再次尝试。',
                laneInvalid: '滑条转换出错：{time}处轨道{pos}已被占用',
                noStart: '滑条转换出错：{time}处滑条（滑键）没有起始note'
            }
        },
        space: {
            title: '計算機能',
            bpm: '最初部分のＢＰＭ',
            offset: '最初部分の偏移量',
            result: '曲の先頭に{0}無音を追加する、或いは音楽の先頭から{1}無音を削除する'
        },
        about: { title: 'について' }
    }
};