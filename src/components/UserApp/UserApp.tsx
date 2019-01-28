import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from 'react-router';
import { compose, Dispatch } from 'redux';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { SchemeContext } from 'src/scheme/scheme-context';
import { ApplicationState } from 'src/store';
import { FetchDataTypeState } from 'src/store/generic/index.class';
import PlaceStateObject, { Place, SchemePlaceContext } from 'src/store/places';
import CategoryStateObject, { SchemeCategory, SchemeCategoryContext } from 'src/store/scheme-categories/index.generic';
import * as schemeActions from 'src/store/schemes/actions';
import { SchemesState } from 'src/store/schemes/types';
import Account from 'src/views/account/Account';
import Dashboard from 'src/views/dashboard/Dashboard';
import SchemeList from 'src/views/scheme-list/SchemeList';
import SchemeDetailPage from 'src/views/SchemeDetailPage/SchemeDetailPage';
import SchemeEditPage from 'src/views/SchemeEditPage/SchemeEditPage';
import SchemeFormPage from 'src/views/SchemeFormPage/SchemeFormPage';
import NavPane from '../NavPane/NavPane';
import TabBar from '../TabBar/TabBar';

interface DispatchProps {
    fetchSchemes: () => any;
    fetchCategories: () => void;
    fetchPlaces: () => void;
    placesState: FetchDataTypeState<Place>;
    categoriesState: FetchDataTypeState<SchemeCategory>;
}

interface UserAppState {
    title: string;
    backButtonEnabled: boolean;
    mobile: boolean;
}

class UserApp extends React.PureComponent<
    { schemesState: SchemesState } & DispatchProps & RouteComponentProps<{}>,
    UserAppState
> {
    public state = { title: '', backButtonEnabled: false, mobile: false };

    private resizeSubscription: Subscription;

    private navLinks = [
        { name: 'Home', to: '/dashboard' },
        { name: 'Programme', to: '/schemes' },
        { name: 'Profil', to: '/account' },
    ];
    // private setTitleWithContext = this.setTitle.bind(this);

    constructor(props: { schemesState: SchemesState } & DispatchProps & RouteComponentProps<{}>) {
        super(props);
        this.props.fetchSchemes();
        this.props.fetchPlaces();
        this.props.fetchCategories();

        const resizeStream = fromEvent(window, 'resize').pipe(
            debounceTime(100),
            map(() => window.innerWidth)
        );
        this.resizeSubscription = resizeStream.subscribe((width: number) => {
            const mobile = width < 600;
            if (this.state.mobile !== mobile) {
                this.setState({ mobile });
            }
        });
        window.dispatchEvent(new Event('resize'));
    }

    public componentWillUnmount() {
        this.resizeSubscription.unsubscribe();
    }

    public render() {
        return (
            <React.Fragment>
                <NavPane
                    /* tslint:disable-next-line:jsx-no-lambda */
                    goBackHandler={() => this.props.history.goBack()}
                    navLinks={this.state.mobile ? undefined : this.navLinks}
                />
                {/* <TitleContext.Provider value={this.setTitle} > */}
                <SchemeCategoryContext.Provider value={this.props.categoriesState}>
                    <SchemePlaceContext.Provider value={this.props.placesState}>
                        <SchemeContext.Provider value={this.props.schemesState}>
                            <Switch>
                                <Route path="/dashboard" component={Dashboard} />
                                <Route path="/schemes" exact component={SchemeList} />
                                <Route path="/schemes/new" component={SchemeFormPage} />
                                <Route path="/schemes/:id/edit" exact component={SchemeEditPage} />
                                <Route path="/schemes/:id" exact component={SchemeDetailPage} />
                                <Route path="/account" component={Account} />
                                <Redirect from="/" to="/dashboard" />
                            </Switch>
                        </SchemeContext.Provider>
                    </SchemePlaceContext.Provider>
                </SchemeCategoryContext.Provider>
                {/* </TitleContext.Provider> */}
                {this.state.mobile && <TabBar navLinks={this.navLinks} />}
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({ schemesState, placesState, categoriesState }: ApplicationState) => ({
    schemesState,
    placesState,
    categoriesState,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchSchemes: () => dispatch(schemeActions.fetchRequest()),
    fetchCategories: () => dispatch(CategoryStateObject.fetchRequest()),
    fetchPlaces: () => dispatch(PlaceStateObject.fetchRequest()),
});

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withRouter
)(UserApp);
