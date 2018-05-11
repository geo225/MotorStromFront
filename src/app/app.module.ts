import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormControlDirective, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { CarsComponent } from './cars/cars.component';
import { CarDetailComponent, DialogConfirm } from './car-detail/car-detail.component';
import {CarService} from './car.service';
import { UserService } from './user.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
import { CommonModule } from '@angular/common';
import {CdkTableModule} from '@angular/cdk/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CarAddComponent } from './car-add/car-add.component';
import { UserListComponent } from './user-list/user-list.component';
import { TrimValueAccessorModule } from 'ng-trim-value-accessor';
import { Ng2FileInputModule } from 'ng2-file-input';

@NgModule({
  entryComponents:[
    DialogConfirm
  ],
  declarations: [
    AppComponent,
    CarsComponent,
    CarDetailComponent,
    MessagesComponent,
    DashboardComponent,
    UserComponent,
    SignUpComponent,
    SignInComponent,
    HomeComponent,
    CarAddComponent,
    UserListComponent,
    DialogConfirm
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    CommonModule,
    MatToolbarModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    CdkTableModule,
    MatTabsModule,
    MatCardModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTooltipModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    TrimValueAccessorModule,
    Ng2FileInputModule.forRoot()
  ],
  exports:[
    CommonModule,
    MatToolbarModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    CdkTableModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTooltipModule,
    TrimValueAccessorModule
  ],
  providers: [
    CarService,
    UserService,
    MessageService,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthInterceptor,
      multi : true
    },
    AuthGuard,
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
    FormControlDirective,
    FormGroupDirective,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
