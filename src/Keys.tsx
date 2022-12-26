import { useState, KeyboardEvent, ChangeEvent } from 'react';
import { IItem } from './index';

const ENTER_KEY = 'Enter';
const ESCAPE_KEY = 'Escape';

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    const [data, setData] = useState(props.initialData);
    const [editingId, setEditingId] = useState(-1);
    const [editingValue, setEditingValue] = useState('');
    const sortedData = [...data].sort((a, b) =>
        props.sorting === 'ASC' ? a.id - b.id : b.id - a.id,
    );
    return (
        <div>
            {sortedData.map((item) => {
                if (editingId !== item.id) {
                    return (
                        <div
                            key={item.id}
                            onClick={() => {
                                setEditingId(item.id);
                                setEditingValue(item.name);
                            }}
                        >
                            {item.name}
                        </div>
                    );
                } else {
                    return (
                        <input
                            key={item.id}
                            onKeyDown={(event: KeyboardEvent) => {
                                if (event.nativeEvent.key === ENTER_KEY) {
                                    item.name = editingValue;
                                    setData([...data]);
                                    setEditingId(-1);
                                    setEditingValue('');
                                }
                                if (event.nativeEvent.key === ESCAPE_KEY) {
                                    setEditingId(-1);
                                    setEditingValue('');
                                }
                            }}
                            value={editingValue}
                            onChange={(
                                event: ChangeEvent<HTMLInputElement>,
                            ) => {
                                setEditingValue(event.target.value);
                            }}
                        ></input>
                    );
                }
            })}
        </div>
    );
}
