import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatContentComponent } from './modules/home/components/chat/chat-content/chat-content.component';
import { ChatComponent } from './modules/home/components/chat/chat.component';

const routes: Routes = [
  {path:'', redirectTo:'chat/socket-js',pathMatch:'full'},
  {path:'chat', redirectTo:'chat/socket-js',pathMatch:'full'},
  {path:'chat', component:ChatComponent, children:[
    {path:':chatId', component:ChatContentComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation:'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
