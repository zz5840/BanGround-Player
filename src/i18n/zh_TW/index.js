export default {
    public: {
        radioOn: '開',
        radioOff: '關',
        cancel: '取消',
        ok: '確認',
        language: '語言',
        inputValue: '請輸入數值',
        fullscreen: {
            title: '全屏',
            succeeded: '翻轉屏幕以獲得最佳體驗',
            failed: '進入全屏失敗，請檢查權限',
            unsupported: '該瀏覽器不支持全屏'
        },
        settings: {
            title: '設置',
            autoFullscreen: '自動全屏',
            speed: '節奏圖標的速度',
            noteScale: '節奏圖標的大小',
            judgeOffset: '判定偏移',
            visualOffset: '視覺偏移',
            barOpacity: '長按按條透明度',
            effectVolume: '效果音音量',
            backgroundDim: '背景圖片透明度',
            showSimLine: '同時點擊線',
            beatNote: '節奏的視覺輔助',
            mirror: '鏡像',
            laneEffect: '軌道特效',
            resolution: '高分辨率'
        },
        guide: {
            title: '歡迎',
            selectLanguage: '考慮到可能是第一次訪問，請選擇你喜歡的語言，稍後可以在右上角的選擇語言裡自由更改',
            changeSettings: '第一次需要設置才能遊玩，也可在之後的設置裡隨時修改',
            complete: '設置完畢，接下來請盡情享受吧',
            next: '下一步',
            skip: '跳過'
        }
    },
    home: {
        play: {
            title: '遊玩譜面',
            mapSource: '譜面來源',
            bestdori: {
                title: 'Bestdori',
                mapId: '譜面ID',
                songId: '歌曲ID',
                type: {
                    title: '譜面類型',
                    official: '官方',
                    community: '社區'
                },
                info: {
                    name: '歌曲名',
                    band: '樂隊',
                    singer: '歌手',
                    difficulty: '難度',
                    level: '等級',
                    notes: '物量',
                    author: '譜面作者'
                }
            },
            local: {
                title: '本地',
                type: {
                    title: '譜面類型',
                    bbb: 'bangbangboom',
                    bd: 'Bestdori'
                },
                mapFile: '歌曲文件',
                mapSource: '譜面代碼',
                mapCover: '封面',
                songName: {
                    title: '歌曲名',
                    default: '測試譜面'
                },
                musicFile: '音樂文件'
            },
            start: '開始',
            load: '載入信息',
            loadFailed: '載入失敗，請重試'
        },
        convert: {
            title: '轉換譜面',
            from: '原譜面格式',
            to: '輸出譜面格式',
            fileInput: '譜面文件',
            noInput: '未選擇任何譜面！',
            convertResult: '轉換結果',
            succeeded: '轉換成功，請複製或下載保存',
            download: '下載',
            serious: '你是沙雕嗎？',
            convert: '轉換',
            error: {
                multiTap: '在{time}处发现多押，由于目前Bestdori未支持多押，请修改后再次尝试。',
                laneInvalid: '滑条转换出错：{time}处轨道{pos}已被占用',
                noStart: '滑条转换出错：{time}处滑条（滑键）没有起始note'
            }
        },
        space: {
            title: '計算留白',
            bpm: '第一段BPM',
            offset: '第一段Offset（秒）',
            result: '請添加 {0} 空白到歌曲開頭或從歌曲開頭刪除 {1} 空白'
        },
        about: { title: '關於' }
    }
};