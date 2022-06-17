import pandas as pd
import openpyxl # excel 파일 제작을 위한 모듈 import
from IPython.display import Image
from matplotlib import cm
import numpy as np
from matplotlib.patches import Circle, Wedge, Rectangle
import plotly.graph_objects as go
import matplotlib.pylab as plt
import time
import sys
import io
# import s3fs
# import boto3

sys.stdout = io.TextIOWrapper(sys.stdout.detach(), encoding = 'utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.detach(), encoding = 'utf-8')

def Test(user_year,user_month,user_metroCd,user_cityCd,user_bill):
    Frame_name = ['year','month','metroCd','cityCd','houseCnt','powerUseage','bill']
    raw_data = pd.read_excel('Usage.xlsx',names = Frame_name)
    raw_data
    # ================================================================================
    createTime = str(time.time())
    def User_data():
        condition1 = raw_data['year'] == user_year
        condition2 = raw_data['month'] == user_month
        condition3 = raw_data['metroCd'] == user_metroCd
        condition4 = raw_data['cityCd'] == user_cityCd
        new_data = raw_data.loc[condition1 & condition2 & condition3 & condition4]
        std_bill = new_data['bill']
        return int(std_bill)

    # ================================================================================
    def Sortation(std_bill,user_bill):
       
        std_1 = std_bill*0.6
        std_2 = std_bill*0.9
        std_3 = std_bill*1.1
        std_4 = std_bill*1.3
        std_5 = std_bill*1.5
        
        if  user_bill < std_1:
            # print("1구간에 속함")
            my_position = 1
        elif user_bill >= std_1 and  user_bill < std_2:
            # print("2구간에 속함")
            my_position = 2
        elif user_bill >= std_2 and  user_bill < std_3:
            # print("3구간에 속함 여기가 평균")
            my_position = 3
        elif user_bill >= std_3 and user_bill < std_4:
            # print("4구간에 속함")
            my_position = 4
        elif user_bill >= std_4 and  user_bill < std_5:
            # print("5구간에 속함")
            my_position = 5
        else:
            # print("6구간에 속함")
            my_position = 6
            #### 출력 ####
        print(std_bill,user_bill,my_position,createTime,end="")
        
        return my_position

    # ================================================================================

    def cal(std_bill,user_bill):
        if user_bill >= std_bill:
            result = (user_bill - std_bill) / std_bill * 100
            int_result = int(result)
            if int_result == 0:
                return int_result
            else:
                return int_result
        else:
            result = (std_bill - user_bill) / std_bill * 100
            int_result = int(result)
            # print("평균값으로부터 {} %덜 사용".format(int_result))
            return int_result

    # ================================================================================
            
    def degree_range(n): 
        start = np.linspace(0,180,n+1, endpoint=True)[0:-1]
        end = np.linspace(0,180,n+1, endpoint=True)[1::]
        mid_points = start + ((end-start)/2.)
        return np.c_[start, end], mid_points

    # ================================================================================

    def rot_text(ang): 
        rotation = np.degrees(np.radians(ang) * np.pi / np.pi - np.radians(90))
        return rotation

    # ================================================================================

    def gauge(labels=['LOW','MEDIUM','HIGH','VERY HIGH','EXTREME'],colors='RdBu', arrow=1, title='Bill'): 
        

        
        N = len(labels)
        
        if arrow > N: 
            raise Exception("\n\nThe category ({}) is greated than         the length\nof the labels ({})".format(arrow, N))

        if isinstance(colors, str):
            cmap = cm.get_cmap(colors, N)
            cmap = cmap(np.arange(N))
            colors = cmap[::-1,:].tolist()
        if isinstance(colors, list): 
            if len(colors) == N:
                colors = colors[::-1]
            else: 
                raise Exception("\n\nnumber of colors {} not equal             to number of categories{}\n".format(len(colors), N))


        
        fig, ax = plt.subplots()

        ang_range, mid_points = degree_range(N)

        labels = labels[::-1]
        

        patches = []
        for ang, c in zip(ang_range, colors): 
            # sectors
            patches.append(Wedge((0.,0.), .4, *ang, facecolor='w', lw=2))
            # arcs
            patches.append(Wedge((0.,0.), .4, *ang, width=0.10, facecolor=c, lw=2, alpha=0.5))
        
        [ax.add_patch(p) for p in patches]


        for mid, lab in zip(mid_points, labels): 

            ax.text(0.35 * np.cos(np.radians(mid)), 0.35 * np.sin(np.radians(mid)), lab,             horizontalalignment='center', verticalalignment='center', fontsize=10,fontweight='bold',              rotation = rot_text(mid))


        r = Rectangle((-0.4,-0.1),0.8,0.1, facecolor='w', lw=2)
        ax.add_patch(r)
        
        ax.text(0, -0.05, title, horizontalalignment='center',          verticalalignment='center', fontsize=22)

        
        pos = mid_points[abs(arrow - N)]
        
        ax.arrow(0, 0, 0.225 * np.cos(np.radians(pos)), 0.225 * np.sin(np.radians(pos)),                  width=0.03, head_width=0.08, head_length=0.1, fc='k', ec='k')
        
        ax.add_patch(Circle((0, 0), radius=0.02, facecolor='k'))
        ax.add_patch(Circle((0, 0), radius=0.01, facecolor='w', zorder=11))


        ax.set_frame_on(False)
        ax.axes.set_xticks([])
        ax.axes.set_yticks([])
        ax.axis('equal')
        plt.tight_layout()
        
        # img_data = io.BytesIO()
        # plt.savefig(img_data,format='png')
        # img_data.seek(0)
        
        # s3 = boto3.resource('s3')
        # bucket = s3.Bucket('ecti-image')
        # bucket.put_object(Body=img_data, ContentType='image/png',Key='./rootkey.csv')  
            
        fig.savefig('./public/images/'+createTime+".png")
            
    # ================================================================================

    # user_year,user_month,user_metroCd,user_cityCd,user_bill = 2020,12,'서울특별시','마포구',28900        
    std_bill = User_data()
    my_position = Sortation(std_bill,user_bill)
    int_result = cal(std_bill,user_bill)
    gauge(labels=['VERY LOW','LOW','AVERAGE','HIGH','VERY HIGH','EXTREME'],colors=['#2f3ecb','#c7e6fd','#f7f7f7','#ff9787','#ff4545','#ff0000'], arrow=my_position, title='User Bill')
    

Test(int(sys.argv[1]),int(sys.argv[2]),str(sys.argv[3]),str(sys.argv[4]),int(sys.argv[5]))
