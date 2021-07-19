import React, { PureComponent } from 'react';
import { PanelProps } from '@grafana/data';
import { PanelOptions, Frame } from 'types';
import { processData } from './utils/helpFunc';
import './style/main.css';

interface Props extends PanelProps<PanelOptions> {}
interface State {
  data: { [key: string]: any }[];
}

export class MainPanel extends PureComponent<Props> {
  state: State = {
    data: [],
  };

  componentDidMount() {
    const series = this.props.data.series as Frame[];

    if (this.props.data.series.length == 0) return;

    const data = processData(series);
    this.setState({ data });
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.data.series != this.props.data.series) {
      if (this.props.data.series.length == 0) {
        this.setState({ data: [] });
        return;
      }

      const series = this.props.data.series as Frame[];
      const data = processData(series);
      this.setState({ data });
    }
  }

  render() {
    const { width, height } = this.props;
    const { data } = this.state;

    if (data.length == 0) return <div>No Data</div>;

    return (
      <div
        style={{
          width,
          height,
          position: 'relative',
          overflowY: 'auto',
          caretColor: 'transparent',
        }}
      >
        <table id="table-dev">
          <tbody>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Project</th>
              <th>Timestamp</th>
            </tr>
            {data.map(record => {
              const { _id, name, project, created_at } = record;
              return (
                <tr key={_id}>
                  <td>{_id}</td>
                  <td>{name}</td>
                  <td>{project}</td>
                  <td>{new Date(created_at * 1000).toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
