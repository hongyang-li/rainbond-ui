import React, { PureComponent } from "react";
import {
  Form,
  Select,
  Radio,
  Modal,
  Input,
} from "antd";
import KVinput from "../../../components/KVinput";
import appProbeUtil from "../../../utils/appProbe-util";

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

// 设置、编辑健康监测
@Form.create()
export default class EditHealthCheck extends PureComponent {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(
      {
        force: true,
      },
      (err, vals) => {
        if (!err) {
          this.props.onOk && this.props.onOk(vals);
        }
      },
    );
  };
  checkPath = (rule, value, callback) => {
    const visitType = this.props.form.getFieldValue("scheme");
    if (visitType == "tcp") {
      callback();
      return;
    }

    if (visitType != "tcp" && value) {
      callback();
      return;
    }
    callback("请填写路径!");
  };
  render() {
    const {
      title, onCancel, ports,
    } = this.props;
    const data = this.props.data || {};
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 6,
        },
      },
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 16,
        },
      },
    };
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const scheme = getFieldValue("scheme") || "tcp";
    return (
      <Modal width={700} title={title} onOk={this.handleSubmit} onCancel={onCancel} visible>
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="检测端口">
            {getFieldDecorator("port", {
              initialValue:
                appProbeUtil.getPort(data) || (ports.length ? ports[0].container_port : ""),
            })(<Select>
              {ports.map(port => <Option value={port.container_port}>{port.container_port}</Option>)}
               </Select>)}
          </FormItem>
          <FormItem {...formItemLayout} label="探针协议">
            {getFieldDecorator("scheme", {
              initialValue: data.scheme || "tcp",
            })(<RadioGroup
              options={[
                  {
                    label: "tcp",
                    value: "tcp",
                  },
                  {
                    label: "http",
                    value: "http",
                  },
                ]}
            />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="http请求头"
            style={{
              display: scheme === "tcp" ? "none" : "",
            }}
          >
            {getFieldDecorator("http_header", {
              initialValue: data.http_header || "",
            })(<KVinput />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="路径"
            style={{
              display: scheme === "tcp" ? "none" : "",
            }}
          >
            {getFieldDecorator("path", {
              initialValue: data.path || "",
              rules: [
                {
                  validator: this.checkPath,
                },
              ],
            })(<Input placeholder="响应码2xx、3xx为正常" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="初始化等候时间">
            {getFieldDecorator("initial_delay_second", {
              initialValue: data.initial_delay_second || "2",
              rules: [
                {
                  required: true,
                  message: "请填写初始化等候时间",
                },
              ],
            })(<Input
              type="number"
              style={{
                  width: "80%",
                }}
            />)}
            <span
              style={{
                marginLeft: 8,
              }}
            >
              秒
            </span>
          </FormItem>
          <FormItem {...formItemLayout} label="检测间隔时间">
            {getFieldDecorator("period_second", {
              initialValue: data.period_second || "3",
              rules: [
                {
                  required: true,
                  message: "请填写检测间隔时间",
                },
              ],
            })(<Input
              type="number"
              style={{
                  width: "80%",
                }}
            />)}
            <span
              style={{
                marginLeft: 8,
              }}
            >
              秒
            </span>
          </FormItem>
          <FormItem {...formItemLayout} label="检测超时时间">
            {getFieldDecorator("timeout_second", {
              initialValue: data.timeout_second || "20",
              rules: [
                {
                  required: true,
                  message: "请填写检测超时时间",
                },
              ],
            })(<Input
              type="number"
              style={{
                  width: "80%",
                }}
            />)}
            <span
              style={{
                marginLeft: 8,
              }}
            >
              秒
            </span>
          </FormItem>
          <FormItem {...formItemLayout} label="连续成功次数">
            {getFieldDecorator("success_threshold", {
              initialValue: data.success_threshold || "1",
              rules: [
                {
                  required: true,
                  message: "请填写连续成功次数",
                },
              ],
            })(<Input
              type="number"
              style={{
                  width: "80%",
                }}
            />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
