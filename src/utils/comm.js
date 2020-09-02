/*
 * @Author: ShiHuiJun
 * @Date: 2020-06-01 13:24:54
 * @Last Modified by:   ShiHuiJun
 * @Last Modified time: 2020-09-01 13:24:54
 */

export const formatEmpty = (row, column, cellValue, index) => {
    return cellValue ? cellValue : '暂无';
};

export const formatType = (row, column, cellValue, index) => {
    return (
        {
            1: '直播',
            2: '录播'
        }[cellValue] || ''
    );
};
