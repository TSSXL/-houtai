import Vue from 'vue'
import {
    Container,
    Aside,
    Main,
    Header,
    Menu,
    Submenu,
    MenuItem,
    Select,
    Option,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    Popover,
    Breadcrumb,
    BreadcrumbItem,
    Form,
    FormItem,
    Input,
    Upload,
    Cascader,
    Dialog,
    Button,
    RadioGroup,
    Radio,
    DatePicker,
    Card,
    Col,
    Row,
    Table,
    TableColumn,
    RadioButton,
    Tag,
    Message,
    MessageBox,
    Scrollbar
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.use(Scrollbar)
Vue.use(Tag)
Vue.use(Table)
Vue.use(RadioButton)
Vue.use(TableColumn)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Header)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Select)
Vue.use(Option)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Popover)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Upload)
Vue.use(Cascader)
Vue.use(Dialog)
Vue.use(Button)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(DatePicker)
Vue.use(Card)
Vue.use(Col)
Vue.use(Row)