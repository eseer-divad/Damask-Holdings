"""
URL configuration for payroll project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from payroll.views import views

#Broke up the view imports so they don't get too long
from payroll.views import view_login, view_timepunch, view_get_PTO
from payroll.views import view_pto_submission, view_pto_reqs
from payroll.views import view_delete_emp_PTO_Req
from payroll.views import view_all_PTO_request
from payroll.views import view_user_info
from payroll.views import view_get_all_punches
from payroll.views import view_AD_pto_req
from payroll.views import view_delete_account
from payroll.views import view_AD_pto_req
from payroll.views import view_delete_account

urlpatterns = [
    path('', views.home),
    path('create-account/', views.createUser),
    path('val_login', view_login.validate_login),
    path('user-info/', view_user_info.get_user_info),
    path('delete-account/', view_delete_account.delete_account.as_view(), name='delete_account'),
    path('timepunch', view_timepunch.add_time_punch),
    path('pto_qty', view_get_PTO.get_available_PTO),
    path('Submit-pto-request', view_pto_submission.submit_pto_request),
    path('my-pto-requests', view_pto_reqs.get_PTO_reqs),
    path('del-PTO-req-emp', view_delete_emp_PTO_Req.del_PTO_Reqs),
    path('all-pto-requests', view_all_PTO_request.get_all_PTO_reqs),
    path('set-pto-request', view_AD_pto_req.set_PTO_Req),
    path('my_punches', view_get_all_punches.get_user_punches),
    path('set-pto-request', view_AD_pto_req.set_PTO_Req)
]
